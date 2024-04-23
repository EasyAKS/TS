package com.denishrynkevich.easyaks.navigation

import androidx.compose.runtime.Composable
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import com.denishrynkevich.easyaks.MainViewModel
import com.denishrynkevich.easyaks.screens.MainScreen
import com.denishrynkevich.easyaks.screens.QuizScreen
import com.denishrynkevich.easyaks.screens.ResultsScreen
import com.denishrynkevich.easyaks.screens.SplashScreen
import com.denishrynkevich.easyaks.utils.Constants

sealed class Screens(val route: String) {
    object Splash: Screens(route = Constants.Screens.SPLASH_SCREEN)
    object Main: Screens(route = Constants.Screens.MAIN_SCREEN)
    object Quiz: Screens(route = Constants.Screens.QUIZ_SCREEN)
    object Results: Screens(route = Constants.Screens.RESULTS_SCREEN)

}
@Composable
fun SetupNavHost(navController: NavHostController, viewModel: MainViewModel) {
    NavHost(
        navController = navController,
        startDestination = Screens.Splash.route
    ) {
        composable(route = Screens.Splash.route) {
            SplashScreen(navController = navController, viewModel = viewModel)
        }
        composable(route = Screens.Main.route) {
            MainScreen(navController = navController, viewModel = viewModel)
        }
        composable(route = Screens.Quiz.route) {
                backStackEntry ->
            val themeName = backStackEntry.arguments?.getString("themeName")
            QuizScreen(themeName, viewModel = viewModel, navController = navController)
            //QuizScreen(navController = navController, viewModel = viewModel)
        }
        composable(route = Screens.Results.route){
                backStackEntry ->
            val score = backStackEntry.arguments?.getInt("score")
            val maxScore = backStackEntry.arguments?.getInt("maxScore")
            ResultsScreen(score, maxScore)

        }
    }
}