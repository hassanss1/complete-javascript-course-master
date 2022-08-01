import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model';
import recipeView from './views/RecipeView';
import searchView from './views/searchView';

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    await model.loadRecipe(id);

    recipeView.renderSpinner();
    // Rendering html
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(err);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    // get query string from view
    const query = searchView.getQuery();
    // get results from model
    await model.loadSearchResults(query);
    console.log(model.state.search.results);

    // resultsView.render(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};

// publisher-subscriber logic from views
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
