const request = require('supertest');
const app = require('../app')
// const baseURL = "http://localhost:8000"
const dotenv = require("dotenv");
dotenv.config();

// describe("Dog", () => {
//     it("should have name called 'Arnold'", () => {
//         const dog = new Dog("Arnold");

//         expect(dog).toHaveProperty("name", "Arnold");
//     });

//     it("should be able to bark and return 'Woof!'", () => {
//         const dog = new Dog("Arnold");
//         expect(dog.bark()).toEqual("Woof!");
//     });
// });

// describe("API get all cars", () => {
//     it("success get all data cars", (done) => {
//         request(app)
//             .get("/v1/cars")
//             .expect(200, done);
//     });
// });

describe("API get all cars", () => {
    it("success get all data cars", async () => {
        const response = await request(app).get('/v1/cars')
        expect(response.statusCode).toBe(200);
    });
});

describe("API get car By ID", () => {
    it("success get data car", async () => {
        const response = await request(app).get('/v1/cars/20')
        expect(response.statusCode).toBe(200);
    });
});
