const dynamic:any = {
    _id: "asdasdasdâsdjfgpaokfjgâg",
    name: "sur la coche",
}

for (let property in dynamic) {
    console.log(dynamic[property]);
}

console.log(dynamic["id"]);
console.log(dynamic["id"]==undefined);
console.log(dynamic["id"]===undefined);
console.log(dynamic["id"]== null);
console.log(typeof dynamic["id"]);
console.log(typeof dynamic["_id"]);