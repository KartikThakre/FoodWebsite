import classes from './AvailableMeals.module.css'
import Card from '../UI/Card'
import MealItem from './MealItem/MealItem';
import { useEffect, useState } from 'react';

const AvailbleMeals = () =>{

  const [meals ,setMeals] = useState([]);
  const [isLoading , setIsloading] = useState(true);
  const [httpError , setHttpError] = useState(null);

  useEffect (() =>{
    const fetchmeals = async () =>{
      const response = await fetch('https://meals-data-cd85a-default-rtdb.firebaseio.com/meals.json');

      if(!response.ok){
         throw new Error("Something went wrong!!!");
      }

      const responseData = await response.json();

      const loadedmeals = [];

      for (const key in responseData) {
        loadedmeals.push({
          id:key,
          name : responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price
        });
      }
      setMeals(loadedmeals);
      setIsloading(false);
   };
    fetchmeals().catch((error =>{
      setIsloading(false);
      //erroe,message give an error : Failed to Fetch
      setHttpError(error.message);
    }))
    
  },[]);
  
  if(isLoading){
    return(
    <section className = {classes.mealsloading}>
      <p>Loading...</p>
    </section>
    );
  }

  if(httpError){
    return(
    <section className = {classes.mealserror}>
      <p>{httpError}</p>
    </section>
    );
  }

    const mealList = meals.map((meal)=>(
    <MealItem 
    key={meal.id} 
    id={meal.id}
    name={meal.name} 
    description={meal.description} 
    price={meal.price}></MealItem>));
    return (
    <section className ={classes.meals}>
        <Card>
        <ul>
            {mealList}
        </ul>
        </Card>

    </section>
    );

}
export default AvailbleMeals;