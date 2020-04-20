import React, { useEffect, useState } from 'react';
import './App.css';

import Recipe from './Components/Recipe';

function App() {
	const APP_ID = 'd99d474f';
	const API_KEY = 'b387ae17766df7993d1a8ebf5cb6b8c9';

	//const [ counter, updateCounter ] = useState(0);
	/*
			<button type='submit' onClick={() => updateCounter(counter + 1)} className='search-button'>
				{counter}
			</button>
  */

	const [ recipes, setRecipes ] = useState([]);
	const [ search, setSearch ] = useState('');
	const [ recipeQuery, setQuery ] = useState('');

	const updateSearch = (e) => {
		setSearch(e.target.value);
	};

	const getSearch = (e) => {
		e.preventDefault();
		setQuery(search);
		setSearch('');
	};

	useEffect(
		() => {
			// triggers when something gets re-rendered in the component/state
			//console.log('Effect Running...');
			getRecipes();
		},
		[ recipeQuery ]
	); // can pass a parameter of only executing if certain values are updated

	const getRecipes = async () => {
		const response = await fetch(
			`https://api.edamam.com/search?q=${recipeQuery}&app_id=${APP_ID}&app_key=${API_KEY}`
		);
		const data = await response.json();
		console.log(data.hits);
		setRecipes(data.hits);

		//fetch(`https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${API_KEY}`).then((resp) => {
		//	resp.json();
		//});
	};

	return (
		<div className='App'>
			<form className='search-form' onSubmit={getSearch}>
				<input type='text' value={search} onChange={updateSearch} className='search-bar' />
				<button type='submit' className='search-button'>
					Search
				</button>
			</form>
			<div className='recipe-card'>
				{recipes.map((recipe) => (
					<Recipe
						key={recipe.recipe.label}
						label={recipe.recipe.label}
						calories={recipe.recipe.calories}
						image={recipe.recipe.image}
						ingredients={recipe.recipe.ingredients}
					/>
				))}
			</div>
		</div>
	);
}

export default App;
