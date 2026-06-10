import {test, request, expect} from '@playwright/test'
import { validateSchema } from '../../schema-validator'


test.describe('API Booker', () =>{
    
    

    test('Should get all the bookings ID', async ({request}) => {

        const allBookings = [
            {
                "bookingid": 1
            },
            {
                "bookingid": 2
            },
            {
                "bookingid": 3
            },
            {
                "bookingid": 4
            }
            ]
        
        const gettingAllBookings = await request.get('https://restful-booker.herokuapp.com/booking') 
        const responseBody = await gettingAllBookings.json() 
        
        await validateSchema('bookings', 'GET_bookings', responseBody)
        expect(gettingAllBookings.status()).toBe(200)
        expect(allBookings[1]).toEqual({bookingid: 2})
    })

    test('Should create booking', async ({request}) => {

        const bookingDetails = {
            "firstname" : "Bere",
            "lastname" : "Villa",
            "totalprice" : 289,
            "depositpaid" : true,
            "bookingdates" : {
                "checkin" : "2026-01-01",
                "checkout" : "2026-06-01"
            },
            "additionalneeds" : "Breakfast"
        }
        
        const createBooking = await request.post('https://restful-booker.herokuapp.com/booking',{
            data: bookingDetails
        })

        const bookingResponse = await createBooking.json()
        console.log(bookingResponse)
        
        await validateSchema('bookingcreated', 'POST_bookings', bookingResponse)
        expect(createBooking.status()).toBe(200)
        expect(bookingResponse.booking.firstname).toBe(bookingDetails.firstname)
    })

    test('Should update a Booking', async ({request}) => {
        
        const credentials = {
        "username" : "admin",
        "password" : "password123"
        }

        const loginApi = await request.post('https://restful-booker.herokuapp.com/auth', {
            data: credentials
        
        })

        const {token} = await loginApi.json()
        
        const userBooking = {
            
            "firstname": "Mariana",
            "lastname": "Aguilar",
            "totalprice": 601,
            "depositpaid": true,
            "bookingdates": {
                "checkin": "2018-01-08",
                "checkout": "2023-08-12"
            },
            "additionalneeds": "Breakfast"
        }
        const updateBooking = await request.put('https://restful-booker.herokuapp.com/booking/10', {
            headers:{
                'Cookie': `token=${token}`
            }, 
            data: userBooking
        })

        const updateResponse = await updateBooking.json()
        await validateSchema('updatebooking', 'PUT_bookingupdate', updateResponse)
        expect (updateBooking.status()).toBe(200)

    })

    test('Should update partially a Booking', async ({request}) => {
        
        const credentials = {
        "username" : "admin",
        "password" : "password123"
        }

        const loginApi = await request.post('https://restful-booker.herokuapp.com/auth', {
            data: credentials
        
        })

        const {token} = await loginApi.json()
        
        const partialData = {
            
            "firstname": "Juan",
            "lastname": "Villa"
            
        }
        const partiaUpdate = await request.patch('https://restful-booker.herokuapp.com/booking/11', {
            headers:{
                'Cookie': `token=${token}`
            }, 
            data: partialData
        })

        const partialUpdateResponse = await partiaUpdate.json()
        await validateSchema('partialupdate', 'PATCH_partialupdate', partialUpdateResponse)
        expect (partiaUpdate.status()).toBe(200)

    })

    test('Should remove a booking', async({request}) =>{

        const credentials = {
            "username" : "admin",
            "password" : "password123"
        }

        const loginApi = await request.post('https://restful-booker.herokuapp.com/auth', {
            data: credentials
        
        })

        const {token} = await loginApi.json()

        const bookingDetails = {
            "firstname" : "Bere",
            "lastname" : "Villa",
            "totalprice" : 289,
            "depositpaid" : true,
            "bookingdates" : {
                "checkin" : "2026-01-01",
                "checkout" : "2026-06-01"
            },
            "additionalneeds" : "Breakfast"
        }
        
        const createBooking = await request.post('https://restful-booker.herokuapp.com/booking',{
            data: bookingDetails
        })
        const createResponse = await createBooking.json()
        const bookingId = createResponse.bookingid
        console.log(bookingId)

        const removeBooking = await request.delete(`https://restful-booker.herokuapp.com/booking/${bookingId}`,{
            headers:{
                'Cookie': `token=${token}`
            }
        })
        const removeResponse = removeBooking.text()
        await validateSchema('deletebooking', 'DELETE_booking', removeResponse)
        expect (removeBooking.status()).toBe(201)
    })
})
