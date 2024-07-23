# Notes on MediasRoutes

The part commented is for a time we where testing that to go with the express middleware flow.
But because we are in the "sendfile" flow. this return errors.
```javascript
await res.sendFile(
targetMediaPath,
options,
(error) => {
if (error){
//res.serviceResponse.code = StatusCodes.NOT_FOUND;
//res.serviceResponse.error = true;
//res.serviceResponse.data = error;
//next(error);
//res.status(404).send(new ApiResponse({ error: true, code: StatusCodes.NOT_FOUND, message: "File not found", errors: [], data: {} }).response)

LogHelper.info("Media : NOT_FOUND", error);
res.status(StatusCodes.NOT_FOUND);//do not use send, it return a : can't send header another time error.
res.end();
}
else {
res.end();
}
        }
);
```