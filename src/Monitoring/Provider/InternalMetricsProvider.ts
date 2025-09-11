import mongoose, {Connection} from 'mongoose';
import * as os from 'os';
import ServerController from "@src/Server/Controllers/ServerController";
import {DataProvider} from "@database/Providers/DataProvider";

// Type definitions
interface OperationCounts {
    find: number;
    insert: number;
    update: number;
    delete: number;
    aggregate: number;
}

interface OperationTimes {
    find: number[];
    insert: number[];
    update: number[];
    delete: number[];
    aggregate: number[];
}

interface ErrorRecord {
    timestamp: number;
    type: string;
    message: string;
    stack?: string;
}

interface ConnectionPoolMetrics {
    state: number;
    readyStateText: string;
    maxPoolSize?: number;
    host?: string;
    port?: number;
    name?: string;
    availableConnections?: number;
    checkedOutConnections?: number;
    createdConnections?: number;
    destroyedConnections?: number;
    totalConnections?: number;
    minPoolSize?: number;
    maxIdleTimeMS?: number;
    waitQueueSize?: number;
}

interface OperationMetrics {
    insert: number;
    query: number;
    update: number;
    delete: number;
    getmore: number;
    command: number;
}

interface NetworkMetrics {
    bytesIn: number;
    bytesOut: number;
    numRequests: number;
}

interface MemoryMetrics {
    resident: number;
    virtual: number;
    mapped: number;
    mappedWithJournal: number;
}

interface ConnectionMetrics {
    current: number;
    available: number;
    totalCreated: number;
}

interface LockMetric {
    acquireCount: Record<string, number>;
    acquireWaitCount: number;
    timeAcquiringMicros: number;
}

interface WiredTigerMetrics {
    cacheSize: number;
    cacheUsed: number;
    cacheDirty: number;
}

interface PerformanceMetrics {
    operations: OperationMetrics;
    network: NetworkMetrics;
    memory: MemoryMetrics;
    connections: ConnectionMetrics;
    locks: Record<string, LockMetric> | null;
    wiredTiger: WiredTigerMetrics | null;
}

interface DatabaseMetrics {
    collections: number;
    views: number;
    objects: number;
    avgObjSize: number;
    dataSize: number;
    storageSize: number;
    indexes: number;
    indexSize: number;
    totalSize: number;
    scaleFactor: number;
}

interface OperationTimeStats {
    average: number;
    min: number;
    max: number;
    count: number;
}

interface ApplicationMetrics {
    operationCounts: OperationCounts;
    averageOperationTimes: Record<string, OperationTimeStats>;
    recentErrors: Array<{
        type: string;
        message: string;
        timestamp: string;
    }>;
    totalErrors: number;
    activeModels: number;
    processMemory: NodeJS.MemoryUsage;
    processUptime: number;
}

interface SystemInfo {
    hostname: string;
    platform: string;
    arch: string;
    cpus: number;
    totalMemory: number;
    freeMemory: number;
    uptime: number;
    loadAverage: number[];
}

interface MongoDBServerInfo {
    version: string;
    process: string;
    pid: number;
    uptime: number;
    uptimeMillis: number;
    uptimeEstimate: number;
    localTime: Date;
}

interface ServerMetrics {
    system: SystemInfo;
    mongodb: MongoDBServerInfo | null;
}

interface ReplicationMember {
    name: string;
    health: number;
    state: number;
    stateStr: string;
    uptime: number;
    lastHeartbeat?: Date;
}

interface ReplicationMetrics {
    set: string;
    myState: number;
    members: ReplicationMember[];
}

interface ErrorMetrics {
    total: number;
    last24Hours: number;
    errorTypes: Record<string, number>;
    recentErrors: Array<{
        type: string;
        message: string;
        timestamp: string;
    }>;
}

interface HealthCheck {
    connection: boolean;
    ping: boolean;
}

interface HealthMetrics {
    status: 'healthy' | 'unhealthy';
    checks: HealthCheck;
    issues: string[];
}

interface CompleteMetrics {
    timestamp: string;
    uptime: number;
    connectionPool: ConnectionPoolMetrics;
    performance: PerformanceMetrics | null;
    database: DatabaseMetrics | null;
    application: ApplicationMetrics;
    server: ServerMetrics;
    replication: ReplicationMetrics | null;
    errors: ErrorMetrics;
    health: HealthMetrics;
}

interface MetricsError {
    error: boolean;
    message: string;
    timestamp: string;
    readyState?: number;
}

interface HealthCheckResult {
    status: 'healthy' | 'unhealthy';
    pingTime?: number;
    error?: string;
    timestamp: string;
}

interface FormattedMetrics {
    summary: {
        status: string;
        connections: {
            available?: number;
            checkedOut?: number;
            total?: number;
        };
        operations: {
            total: number;
            errors: number;
        };
        memory: {
            mongoResident?: number;
            processRSS?: number;
        };
    };
    detailed: CompleteMetrics | MetricsError;
}

type OperationType = keyof OperationCounts;

class MongoDBMetricsMonitor {
    private startTime: number;
    private operationCounts: OperationCounts;
    private operationTimes: OperationTimes;
    private errors: ErrorRecord[];
    private readonly maxOperationTimeHistory: number;

    constructor() {
        this.startTime = Date.now();
        this.operationCounts = {
            find: 0,
            insert: 0,
            update: 0,
            delete: 0,
            aggregate: 0
        };
        this.operationTimes = {
            find: [],
            insert: [],
            update: [],
            delete: [],
            aggregate: []
        };
        this.errors = [];
        this.maxOperationTimeHistory = 1000; // Keep last 1000 operations for averages
    }

    /**
     * Get comprehensive MongoDB metrics
     */
    async getMetrics(): Promise<CompleteMetrics> {

        const dataConnection = DataProvider.instance()?.connection;

        try {
            if (!dataConnection) throw Error("MongoDB connection not found");
            if (dataConnection.readyState !== 1) throw Error("MongoDB connection not established");

            // Get database admin stats
            const adminDb = dataConnection.db.admin();
            const [serverStatus, dbStats, replSetStatus] = await Promise.allSettled([
                adminDb.serverStatus(),
                dataConnection.db.stats(),
                this.getReplSetStatus(adminDb)
            ]);

            return {
                timestamp: new Date().toISOString(),
                uptime: Date.now() - this.startTime,
                connectionPool: this.getConnectionPoolMetrics(dataConnection),
                performance: this.getPerformanceMetrics(
                    serverStatus.status === 'fulfilled' ? serverStatus.value : null
                ),
                database: this.getDatabaseMetrics(
                    dbStats.status === 'fulfilled' ? dbStats.value : null
                ),
                application: this.getApplicationMetrics(),
                server: this.getServerMetrics(
                    serverStatus.status === 'fulfilled' ? serverStatus.value : null
                ),
                replication: replSetStatus.status === 'fulfilled' ? replSetStatus.value : null,
                errors: this.getErrorMetrics(),
                health: this.getHealthMetrics(dataConnection)
            };
        } catch (error) {
            throw new Error(`Failed to collect metrics: ${(error as Error).message}`);
        }
    }

    /**
     * Get connection pool specific metrics
     */
    private getConnectionPoolMetrics(connection: Connection): ConnectionPoolMetrics {
        const client = (connection as any).getClient?.();
        const topology = client?.topology;

        let poolMetrics: ConnectionPoolMetrics = {
            state: connection.readyState,
            readyStateText: this.getReadyStateText(connection.readyState),
            maxPoolSize: connection.getMaxListeners(), // Approximate
            host: connection.host,
            port: connection.port,
            name: connection.name
        };

        // Try to get detailed pool stats if available
        if (topology?.s?.servers) {
            const servers = Array.from(topology.s.servers.values());
            if (servers.length > 0) {
                const server = servers[0] as any;
                if (server.pool) {
                    poolMetrics = {
                        ...poolMetrics,
                        availableConnections: server.pool.availableConnectionCount || 0,
                        checkedOutConnections: server.pool.checkedOutConnectionCount || 0,
                        createdConnections: server.pool.createdConnectionCount || 0,
                        destroyedConnections: server.pool.destroyedConnectionCount || 0,
                        totalConnections: server.pool.totalConnectionCount || 0,
                        minPoolSize: server.pool.options?.minPoolSize || 0,
                        maxPoolSize: server.pool.options?.maxPoolSize || 100,
                        maxIdleTimeMS: server.pool.options?.maxIdleTimeMS || 0,
                        waitQueueSize: server.pool.waitQueueSize || 0
                    };
                }
            }
        }

        return poolMetrics;
    }

    /**
     * Get performance metrics from server status
     */
    private getPerformanceMetrics(serverStatus: any): PerformanceMetrics | null {
        if (!serverStatus) return null;

        return {
            // Operation Counters
            operations: {
                insert: serverStatus.opcounters?.insert || 0,
                query: serverStatus.opcounters?.query || 0,
                update: serverStatus.opcounters?.update || 0,
                delete: serverStatus.opcounters?.delete || 0,
                getmore: serverStatus.opcounters?.getmore || 0,
                command: serverStatus.opcounters?.command || 0
            },

            // Network metrics
            network: {
                bytesIn: serverStatus.network?.bytesIn || 0,
                bytesOut: serverStatus.network?.bytesOut || 0,
                numRequests: serverStatus.network?.numRequests || 0
            },

            // Memory metrics
            memory: {
                resident: serverStatus.mem?.resident || 0,
                virtual: serverStatus.mem?.virtual || 0,
                mapped: serverStatus.mem?.mapped || 0,
                mappedWithJournal: serverStatus.mem?.mappedWithJournal || 0
            },

            // Connection metrics
            connections: {
                current: serverStatus.connections?.current || 0,
                available: serverStatus.connections?.available || 0,
                totalCreated: serverStatus.connections?.totalCreated || 0
            },

            // Lock metrics
            locks: this.parseLockMetrics(serverStatus.locks),

            // WiredTiger metrics (if available)
            wiredTiger: serverStatus.wiredTiger ? {
                cacheSize: serverStatus.wiredTiger.cache?.['maximum bytes configured'] || 0,
                cacheUsed: serverStatus.wiredTiger.cache?.['bytes currently in the cache'] || 0,
                cacheDirty: serverStatus.wiredTiger.cache?.['tracked dirty bytes in the cache'] || 0
            } : null
        };
    }

    /**
     * Get database statistics
     */
    private getDatabaseMetrics(dbStats: any): DatabaseMetrics | null {
        if (!dbStats) return null;

        return {
            collections: dbStats.collections || 0,
            views: dbStats.views || 0,
            objects: dbStats.objects || 0,
            avgObjSize: dbStats.avgObjSize || 0,
            dataSize: dbStats.dataSize || 0,
            storageSize: dbStats.storageSize || 0,
            indexes: dbStats.indexes || 0,
            indexSize: dbStats.indexSize || 0,
            totalSize: dbStats.totalSize || 0,
            scaleFactor: dbStats.scaleFactor || 1
        };
    }

    /**
     * Get application-level metrics
     */
    private getApplicationMetrics(): ApplicationMetrics {
        return {
            operationCounts: { ...this.operationCounts },
            averageOperationTimes: this.getAverageOperationTimes(),
            recentErrors: this.errors.slice(-10).map(error => ({
                type: error.type,
                message: error.message,
                timestamp: new Date(error.timestamp).toISOString()
            })),
            totalErrors: this.errors.length,
            activeModels: Object.keys(mongoose.models).length,
            processMemory: process.memoryUsage(),
            processUptime: process.uptime() * 1000 // Convert to ms
        };
    }

    /**
     * Get server resource metrics
     */
    private getServerMetrics(serverStatus: any): ServerMetrics {
        return {
            // System info
            system: {
                hostname: os.hostname(),
                platform: os.platform(),
                arch: os.arch(),
                cpus: os.cpus().length,
                totalMemory: os.totalmem(),
                freeMemory: os.freemem(),
                uptime: os.uptime() * 1000,
                loadAverage: os.loadavg()
            },

            // MongoDB server info
            mongodb: serverStatus ? {
                version: serverStatus.version,
                process: serverStatus.process,
                pid: serverStatus.pid,
                uptime: serverStatus.uptime * 1000,
                uptimeMillis: serverStatus.uptimeMillis,
                uptimeEstimate: serverStatus.uptimeEstimate * 1000,
                localTime: serverStatus.localTime
            } : null
        };
    }

    /**
     * Get replication set status
     */
    private async getReplSetStatus(adminDb: any): Promise<ReplicationMetrics | null> {
        try {
            const status = await adminDb.replSetGetStatus();
            return {
                set: status.set,
                myState: status.myState,
                members: status.members?.map((member: any): ReplicationMember => ({
                    name: member.name,
                    health: member.health,
                    state: member.state,
                    stateStr: member.stateStr,
                    uptime: member.uptime,
                    lastHeartbeat: member.lastHeartbeat
                })) || []
            };
        } catch (error) {
            // Not a replica set or access denied
            return null;
        }
    }

    /**
     * Get error metrics
     */
    private getErrorMetrics(): ErrorMetrics {
        const now = Date.now();
        const last24h = this.errors.filter(error =>
            now - error.timestamp < 24 * 60 * 60 * 1000
        );

        const errorTypes: Record<string, number> = {};
        last24h.forEach(error => {
            errorTypes[error.type] = (errorTypes[error.type] || 0) + 1;
        });

        return {
            total: this.errors.length,
            last24Hours: last24h.length,
            errorTypes,
            recentErrors: this.errors.slice(-5).map(error => ({
                type: error.type,
                message: error.message,
                timestamp: new Date(error.timestamp).toISOString()
            }))
        };
    }

    /**
     * Get health check metrics
     */
    private getHealthMetrics(connection: Connection): HealthMetrics {
        const health: HealthMetrics = {
            status: 'healthy',
            checks: {
                connection: connection.readyState === 1,
                ping: false
            },
            issues: []
        };

        if (connection.readyState !== 1) {
            health.status = 'unhealthy';
            health.issues.push('Database connection not established');
        }

        return health;
    }

    /**
     * Helper methods
     */
    private getReadyStateText(state: number): string {
        const states: Record<number, string> = {
            0: 'disconnected',
            1: 'connected',
            2: 'connecting',
            3: 'disconnecting'
        };
        return states[state] || 'unknown';
    }

    private parseLockMetrics(locks: any): Record<string, LockMetric> | null {
        if (!locks) return null;

        const result: Record<string, LockMetric> = {};
        for (const [lockType, lockData] of Object.entries(locks) as [string, any][]) {
            if (lockData.acquireCount) {
                result[lockType] = {
                    acquireCount: lockData.acquireCount,
                    acquireWaitCount: lockData.acquireWaitCount || 0,
                    timeAcquiringMicros: lockData.timeAcquiringMicros || 0
                };
            }
        }
        return result;
    }

    private getAverageOperationTimes(): Record<string, OperationTimeStats> {
        const averages: Record<string, OperationTimeStats> = {};
        for (const [operation, times] of Object.entries(this.operationTimes)) {
            if (times.length > 0) {
                averages[operation] = {
                    average: times.reduce((a:any, b:any) => a + b, 0) / times.length,
                    min: Math.min(...times),
                    max: Math.max(...times),
                    count: times.length
                };
            }
        }
        return averages;
    }

    /**
     * Track operation for metrics
     */
    public trackOperation(operation: OperationType, duration: number): void {
        this.operationCounts[operation]++;
        this.operationTimes[operation].push(duration);

        // Keep only recent operations
        if (this.operationTimes[operation].length > this.maxOperationTimeHistory) {
            this.operationTimes[operation].shift();
        }
    }

    /**
     * Track error for metrics
     */
    public trackError(error: Error | string, type: string = 'unknown'): void {
        this.errors.push({
            timestamp: Date.now(),
            type,
            message: error instanceof Error ? error.message : error.toString(),
            stack: error instanceof Error ? error.stack : undefined
        });

        // Keep only recent errors (last 1000)
        if (this.errors.length > 1000) {
            this.errors.shift();
        }
    }

    /**
     * Perform health check with ping
     */
    public async performHealthCheck(): Promise<HealthCheckResult> {
        try {
            const start = Date.now();
            await mongoose.connection.db.admin().ping();
            const pingTime = Date.now() - start;

            return {
                status: 'healthy',
                pingTime,
                timestamp: new Date().toISOString()
            };
        } catch (error) {
            return {
                status: 'unhealthy',
                error: (error as Error).message,
                timestamp: new Date().toISOString()
            };
        }
    }

    /**
     * Get formatted metrics for logging/monitoring
     */
    public async getFormattedMetrics(): Promise<FormattedMetrics> {
        const metrics = await this.getMetrics();

        if ('error' in metrics) {
            return {
                summary: {
                    status: 'error',
                    connections: {},
                    operations: { total: 0, errors: 0 },
                    memory: {}
                },
                detailed: metrics
            };
        }

        return {
            summary: {
                status: metrics.health?.status || 'unknown',
                connections: {
                    available: metrics.connectionPool?.availableConnections,
                    checkedOut: metrics.connectionPool?.checkedOutConnections,
                    total: metrics.connectionPool?.totalConnections
                },
                operations: {
                    total: Object.values(metrics.application?.operationCounts || {}).reduce((a, b) => a + b, 0),
                    errors: metrics.errors?.total || 0
                },
                memory: {
                    mongoResident: metrics.performance?.memory?.resident,
                    processRSS: metrics.application?.processMemory?.rss
                }
            },
            detailed: metrics
        };
    }
}

export default MongoDBMetricsMonitor;
export type {
    CompleteMetrics,
    MetricsError,
    HealthCheckResult,
    FormattedMetrics,
    OperationType,
    ConnectionPoolMetrics,
    PerformanceMetrics,
    DatabaseMetrics,
    ApplicationMetrics,
    ServerMetrics,
    ReplicationMetrics,
    ErrorMetrics,
    HealthMetrics
};

// Usage example:
/*
import MongoDBMetricsMonitor, {
  MongoDBMetricsError,
  ConnectionNotEstablishedError
} from './mongodb-metrics-monitor';

const metricsMonitor = new MongoDBMetricsMonitor();

// Proper error handling with try-catch
try {
  const metrics = await metricsMonitor.getMetrics();
  console.log('Metrics collected successfully:', metrics.timestamp);
  console.log('Connection pool status:', metrics.connectionPool);
} catch (error) {
  if (error instanceof ConnectionNotEstablishedError) {
    console.error('Database not connected:', error.message);
    // Handle connection issue specifically
  } else if (error instanceof MongoDBMetricsError) {
    console.error('Metrics collection failed:', error.message);
    // Handle metrics collection failure
  } else {
    console.error('Unexpected error:', error);
  }
}

// Track operations (integrate with your mongoose queries)
const start = Date.now();
try {
  const users = await User.find({});
  metricsMonitor.trackOperation('find', Date.now() - start);
  return users;
} catch (error) {
  metricsMonitor.trackError(error as Error, 'database_query');
  throw error; // Re-throw the original error
}

// Health check with proper error handling
try {
  const health = await metricsMonitor.performHealthCheck();
  console.log('Health check passed:', health.pingTime + 'ms');
} catch (error) {
  console.error('Health check failed:', error.message);
  // Handle unhealthy state
}

// Monitoring service with error handling
class MonitoringService {
  async collectMetrics(): Promise<void> {
    try {
      const formatted = await metricsMonitor.getFormattedMetrics();
      console.log('Metrics:', formatted.summary);
      this.sendToPrometheus(formatted.detailed);
    } catch (error) {
      if (error instanceof ConnectionNotEstablishedError) {
        console.warn('Skipping metrics collection - DB not connected');
        return;
      }
      console.error('Failed to collect metrics:', error.message);
      // Could implement retry logic here
    }
  }
}
*/