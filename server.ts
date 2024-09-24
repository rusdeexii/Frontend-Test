const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: 'male' | 'female';
  hair: { color: string };
  postalCode: string;
  department?: string;
}

app.get('/api/users', async (req: any, res: any) => {
  try {
    const response = await fetch('https://dummyjson.com/users');
    const data = await response.json();
    const users = data.users;

    const transformedData = users.reduce((acc: any, user: User) => {
      const department = user.department || 'Unknown';
      if (!acc[department]) {
        acc[department] = {
          male: 0,
          female: 0,
          ageRange: '',
          hair: {},
          addressUser: {},
        };
      }

      const departmentData = acc[department];

     
      if (user.gender === 'male') departmentData.male++;
      if (user.gender === 'female') departmentData.female++;

     
      const age = user.age;
      if (!departmentData.ageRange) {
        departmentData.ageRange = `${age}-${age}`;
      } else {
        const [minAge, maxAge] = departmentData.ageRange.split('-').map(Number);
        departmentData.ageRange = `${Math.min(minAge, age)}-${Math.max(maxAge, age)}`;
      }

      const hairColor = user.hair.color;
      departmentData.hair[hairColor] = (departmentData.hair[hairColor] || 0) + 1;
    
      const fullName = `${user.firstName}${user.lastName}`;
      departmentData.addressUser[fullName] = user.postalCode;

      return acc;
    }, {});

    res.status(200).json(transformedData);
    console.log(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
