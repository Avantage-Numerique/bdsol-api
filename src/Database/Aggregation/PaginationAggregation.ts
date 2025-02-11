// Pagination aggregation with count verification
import mongoose from "mongoose";

interface AggregationResultContract {
    results:Array<any>,
    meta:any,
    modificatedParameters:any
}

/**
 * Prevent over pagination aggregation by checking if the search have the total pages asked for.
 * It does force default value of page size. This must be walled upstream.
 * @param model {mongoose.Model<any>}
 * @param aggregationPipeline {Array<any>}
 * @param skip {number}
 * @param limit {number}
 * @param sort {number}
 */
async function paginationAggregation(model:mongoose.Model<any>, aggregationPipeline:Array<any>, skip:number, limit:number, sort:number = -1):Promise<AggregationResultContract> {
    try {
        // Count total documents matching initial pipeline stages
        const countPipeline = [
            ...aggregationPipeline,
            { $count: 'totalDocuments' }
        ];
        const [countResult] = await model.aggregate(countPipeline);
        const totalDocuments = countResult ? countResult.totalDocuments : 0;


        console.log("paginationAggregation", "count", countResult, "total", totalDocuments, "skip", skip, "pageSize", limit, "sort", sort);

        if (totalDocuments === 0) return countResult;//no result

        const maxPageNumber = Math.floor(totalDocuments / limit);

        // Calculate expected page length
        const firstDocumentOnPageIndex = skip * limit;
        const nextPageLength = Math.min(limit, totalDocuments - firstDocumentOnPageIndex);
        const modificatedParameters:any = {};

        //check if the skip is within the max documents of the query.
        if (firstDocumentOnPageIndex >= totalDocuments && firstDocumentOnPageIndex >= 0) {
            // Modify skip to push the last page.
            skip = maxPageNumber - 1;
            modificatedParameters.skip = maxPageNumber - 1
        }

        console.log("paginationAggregation AFTER skip change.", "firstDocumentOnPageIndex", firstDocumentOnPageIndex, "total", totalDocuments, "skip", skip, "limit", limit, "sort", sort);

        const paginatedPipeline = [
            ...aggregationPipeline,
            {
                $facet: {
                    paginatedResults: [
                        { $sort: { updatedAt: sort } },
                        { $skip: skip },
                        { $limit: limit }
                    ],
                    meta: [
                        {
                            $count: 'count'
                        }
                    ]
                }
            }
        ];

        // Execute aggregation
        const results = await model.aggregate(paginatedPipeline);

        console.log("results[0].paginatedResults.length", results[0].paginatedResults.length, "expectedPageLength", nextPageLength, "results", results, "meta", results[0].meta);

        // Verify result length matches expected
        if (results[0].paginatedResults.length > nextPageLength && results[0].paginatedResults.length === 0) {
            throw new Error('Pagination result count does not match expected length');
        }

        return {
            results: [...results[0].paginatedResults],
            meta: {...results[0].meta[0]},
            modificatedParameters: {
                ...modificatedParameters
            } as AggregationResultContract
        };

    } catch (error) {
        console.error('safeAggregation error:', error);
        throw error;
    }
}

export {paginationAggregation, AggregationResultContract};