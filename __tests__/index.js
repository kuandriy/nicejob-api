// More tests should be added
const request = require("supertest");
const app = require("../server.js");
describe("GET /nicejobcolection ", () => {
  test("It should return an record", async () => {
    const response = await request(app).get("/nicejobcolection/nicejobcolection/e261640833c5c7ad17655a175cda36056a1fb9426185588474d373e9e0efafdc");
    expect(response.body).toEqual([
      {
        "id": "4ea5c508a6566e76240543f8feb06fd457777be39549c4016436afda65d2330e",
        "city": "Vancouver",
        "created_at": "2020-06-19T04:01:25.312Z",
        "name": "Andriy",
        "created": "2020-06-19T23:10:26-07:00"
      }
    ]);
    expect(response.statusCode).toBe(200);
  });
});