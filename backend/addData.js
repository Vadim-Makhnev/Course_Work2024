require('dotenv').config();
const mongoose = require('mongoose');

const passwordDB = process.env.DB_PASSWORD;

mongoose.connect(`mongodb+srv://vadikmahnev:${passwordDB}@cluster0.iecbnjc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
  .then(() => console.log('MongoDB connected for data insertion'))
  .catch(err => console.log('MongoDB connection error:', err));

const productSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: String,
  price: Number,
  image: String, 
  description: String,
});

const Product = mongoose.model('Product', productSchema);

const sampleProducts = [
  { name: 'Product 1', price: 9000, image: 'https://okdivan.ru/image/cache/catalog/1614571516_80-p-divan-na-belom-fone-85-150x150.jpg', 
  description: "Обивка: Высококачественная натуральная кожа премиум-класса, подчеркивающая роскошь и элегантность дивана. Данная кожа прошла специальную обработку для сохранения своего качества и привлекательного внешнего вида на долгие годы. Наполнитель: Высокоупругий пенополиуретан обеспечивает удобство и комфорт при сидении, сохраняя форму дивана даже при длительном использовании." },
  { name: 'Product 2', price: 8000, image: 'https://im9.cz/iR/importprodukt-orig/ed0/ed0c18604a8a49091f6a1fc13dd104d9--mmf150x150.jpg', description: "2" },
  { name: 'Product 3', price: 10000, image: 'https://diamondelectric.ru/images/2378/2377337/small_kreslo_hoff_6.jpg', description: "3" },
  { name: 'Product 4', price: 4000, image: 'https://el.katalog-ceny.ru/image/cache/catalog/eldorado/divani-ml/74176608-150x150.jpg', description: "4" },
  { name: 'Product 5', price: 5000, image: 'https://avatars.mds.yandex.net/get-maps-adv-crm/3736055/2a000001882d9fd24cf72fffdbd2973ad8dc/landing_logo', description: "5" },
  { name: 'Product 6', price: 6000, image: 'https://i.pinimg.com/originals/a5/4f/1e/a54f1ec54f2c41921940a0de88acdbad.jpg', description: "6" },
  { name: 'Product 7', price: 5000, image: 'https://i.pinimg.com/150x150/7c/37/41/7c37410ac62e3a132ad7f3ef9480b0fe.jpg', description: "7" },
  { name: 'Кровать', price: 30000, image: 'https://shen.com.ru/images/thumbnails/150/150/detailed/3/37.png', description: "8" },
];

Product.insertMany(sampleProducts)
  .then(() => {
    console.log('Sample data added');
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log('Error inserting sample data:', err);
    mongoose.connection.close();
  });


 /* const loginSchema = new mongoose.Schema({
    email: String,
    password: String,
  });
  
  const Login = mongoose.model('Login', loginSchema);
  
  const sampleLogins = [
    { email: "test1@gmail.com", password: "1234567" },
  ];
  
  Login.insertMany(sampleLogins)
    .then(() => {
      console.log("Sample login data added");
    })
    .catch((err) => {
      console.log('Error inserting sample login data:', err);
    });*/

