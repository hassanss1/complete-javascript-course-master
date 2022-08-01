import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    await model.loadRecipe(id);

    // Rendering html
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(err);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    // 1) get query string from view
    const query = searchView.getQuery();
    if (!query) return;

    // 2) get results from model
    await model.loadSearchResults(query);
    resultsView.renderSpinner();
    resultsView.render(model.state.recipe);
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
