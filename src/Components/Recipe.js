import React from 'react';

function Recipe(props) {
	return (
		<div className='card'>
			<h1>{props.label}</h1>
			<p>{props.calories}</p>
			<ul>{props.ingredients.map((ingredient) => <li>{ingredient.text}</li>)}</ul>
			<img className='image' src={props.image} />
		</div>
	);
}

export default Recipe;
