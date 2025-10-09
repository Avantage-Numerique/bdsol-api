// Pagination aggregation with count verification
import mongoose from "mongoose";

interface AggregationResultContract {
    results: Array<any>;
    meta: any;
    modificatedParameters: any;
}

/**
 * Safe wall-ing of the last page if the request page / skip > than the total size of the aggregate.
 * @param requestedPage {number} the target page requested by
 * @param limit {number} the current limit from what we are checking the max skip.
 * @param totalDocuments {number} total length of the current query.
 */
function safeSkip(
    requestedPage: number,
    limit: number,
    totalDocuments: number
): number {
    const page = Math.max(1, Math.floor(requestedPage));
    const pageSize = Math.max(1, Math.floor(limit));
    const totalPages = Math.ceil(totalDocuments / pageSize);

    if (totalDocuments <= 0) {
        return 0;
    }

    // Clamp the page to valid range (1 to totalPages)
    const safePage = Math.min(page, totalPages);
    return (safePage - 1) * pageSize;
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
async function paginationAggregation(
    model: mongoose.Model<any>,
    aggregationPipeline: Array<any>,
    skip: number,
    limit: number,
    sort: number = -1
): Promise<AggregationResultContract> {
    try {
        // Count total documents matching initial pipeline stages
        const countPipeline = [
            ...aggregationPipeline,
            { $count: "totalDocuments" },
        ];
        const [countResult] = await model.aggregate(countPipeline);
        const totalDocuments = countResult ? countResult.totalDocuments : 0;

        if (totalDocuments === 0) return countResult; //no result

        const maxPageNumber = Math.ceil(totalDocuments / limit); //removed floor because we need the last part.
        const currentPage = Math.floor(skip / limit);
        // Calculate expected page length
        const lastPageSkipNumber = totalDocuments - (totalDocuments - skip); //weird, mais c'est ce que je pense qui est ok.
        const firstDocumentOnPageIndex = Number(currentPage) * Number(limit);
        const nextPageLength = Math.min(
            limit,
            totalDocuments - firstDocumentOnPageIndex
        ); //check if the current skip is in the last page, and adjust to it.
        const modificatedParameters: any = {};

        const nextSkip = safeSkip(currentPage + 1, limit, totalDocuments); //Math.min(firstDocumentOnPageIndex, lastPageSkipNumber);

        //check if the skip is within the max documents of the query.
        /*if (firstDocumentOnPageIndex >= totalDocuments && firstDocumentOnPageIndex > 0) {
            // Modify skip to push the last page.
            skip = maxPageNumber - 1;
            modificatedParameters.skip = maxPageNumber - 1
        }*/

        const paginatedPipeline = [
            ...aggregationPipeline,
            {
                $facet: {
                    paginatedResults: [
                        { $sort: { updatedAt: sort } },
                        { $skip: nextSkip },
                        { $limit: limit },
                    ],
                    meta: [
                        {
                            $count: "count",
                        },
                    ],
                },
            },
        ];

        // Execute aggregation
        const results = await model.aggregate(paginatedPipeline);

        // Verify result length matches expected
        if (
            results[0].paginatedResults.length > nextPageLength &&
            results[0].paginatedResults.length === 0
        ) {
            throw new Error(
                "Pagination result count does not match expected length"
            );
        }

        return {
            results: [...results[0].paginatedResults],
            meta: { ...results[0].meta[0] },
            modificatedParameters: {
                ...modificatedParameters,
            } as AggregationResultContract,
        };
    } catch (error) {
        console.error("safeAggregation error:", error);
        throw error;
    }
}

export { paginationAggregation, AggregationResultContract };
