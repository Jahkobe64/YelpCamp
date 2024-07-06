const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground')

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async ()  => {
    await Campground.deleteMany({});
    for(let i = 0; i < 50; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '660db69580221c0b39204b58',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/dq4h1knem/image/upload/v1718688016/YelpCamp/ovyyxqiuqaxo4qctvqzr.jpg',
                    filename: 'YelpCamp/ovyyxqiuqaxo4qctvqzr',
                  
                },
                {
                    url: 'https://res.cloudinary.com/dq4h1knem/image/upload/v1718688015/YelpCamp/qjnn7ksnyzxemcargv2v.jpg',
                    filename: 'YelpCamp/qjnn7ksnyzxemcargv2v',
                },
                {
                    url: 'https://res.cloudinary.com/dq4h1knem/image/upload/v1718688016/YelpCamp/xnjqhtadofizzuh0wtoz.png',
                    filename: 'YelpCamp/xnjqhtadofizzuh0wtoz',
                }
              ],
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo cumque pariatur dignissimos ipsam officia earum natus odit. Ipsam, molestias culpa asperiores sequi iusto maxime sit soluta illum similique eius rerum?',
            price,
            geometry : { 
                type: "Point", 
                coordinates: [-113.1331, 47.0202]}
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})