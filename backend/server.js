const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config();

const passwordDB = process.env.DB_PASSWORD;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'src', 'images')));


mongoose.connect(`mongodb+srv://vadikmahnev:${passwordDB}@cluster0.iecbnjc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));


/*ProductSchema*/
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String, 
});

const Product = mongoose.model('Product', productSchema);


app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});


/*LoginSchema*/
const loginSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const Login = mongoose.model('Login', loginSchema);

/*Login*/

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Login.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

/*Register*/

app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Проверяем, существует ли уже пользователь с такой же электронной почтой
    const existingUser = await Login.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Хешируем пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создаем нового пользователя и сохраняем его в базе данных
    const newUser = new Login({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully'});
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});


/*GET*/
app.get('/api/users', async (req, res) => {
  try {
    // Используем метод find для поиска всех пользователей в базе данных
    const users = await Login.find();
    res.json(users); // Отправляем найденных пользователей в формате JSON
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});





/* Server*/
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

