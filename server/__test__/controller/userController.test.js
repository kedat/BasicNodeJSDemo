const request = require("supertest");
const app = require("../../index");

describe("user controller", () => {

  const fakeTodoList = [
    {
      "id": "64f00ff070970ed726b6aeea",
      "title": "Citralan Puri Serang",
      "description": "Massive opportunity to build your dream home at the base of Mummy Mountain in the 3 C's school district. Home is currently updated and very livable if your plans are to build at a later date.* Bonus * to live hillside without hillside restrictions in the town of PV. Run don't walk to capture this needle in a hay stack.",
      "price": 3000,
      "address": "Street 33",
      "city": "California",
      "country": "US",
      "image": "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "facilities": {
        "bathrooms": "3",
        "parking": "1",
        "bedrooms": "2"
      },
      "userEmail": "datuser@gmail.com",
      "createdAt": "2023-08-31T03:58:40.731Z",
      "updatedAt": "2023-08-31T03:58:40.731Z"
    },
    {
      "id": "64eb788a78542688c00703a9",
      "title": "Citralan Puri Serang",
      "description": "Massive opportunity to build your dream home at the base of Mummy Mountain in the 3 C's school district. Home is currently updated and very livable if your plans are to build at a later date.* Bonus * to live hillside without hillside restrictions in the town of PV. Run don't walk to capture this needle in a hay stack.",
      "price": 3000,
      "address": "Street 3",
      "city": "California",
      "country": "US",
      "image": "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "facilities": {
        "bathrooms": "3",
        "parking": "1",
        "bedrooms": "2"
      },
      "userEmail": "datuser2@gmail.com",
      "createdAt": "2023-08-27T16:23:36.694Z",
      "updatedAt": "2023-08-27T16:23:36.694Z"
    },
    {
      "id": "64eb0596064e9ba3c8b172de",
      "title": "Coastal Breeze Villa",
      "description": "Massive opportunity to build your dream home at the base of Mummy Mountain in the 3 C's school district. Home is currently updated and very livable if your plans are to build at a later date.* Bonus * to live hillside without hillside restrictions in the town of PV. Run don't walk to capture this needle in a hay stack.",
      "price": 8000,
      "address": "Street 2",
      "city": "Multan",
      "country": "Pakistan",
      "image": "https://3.bp.blogspot.com/-84l-BoUL090/VTDHcQzSTNI/AAAAAAAAuHI/Khftta_CF5E/s1920/wow-home-design.jpg",
      "facilities": {
        "bathrooms": "5",
        "parking": "1",
        "bedrooms": "4"
      },
      "userEmail": "datuser2@gmail.com",
      "createdAt": "2023-08-27T08:13:10.208Z",
      "updatedAt": "2023-08-27T08:13:10.208Z"
    },
  ];
  test('should return all place', async () => {
    const res = await request(app).get("/api/place/allPlace");
    expect(res.status).toBe(200);
  })
});