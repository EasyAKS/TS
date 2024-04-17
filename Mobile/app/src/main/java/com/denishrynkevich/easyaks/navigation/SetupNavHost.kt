package com.denishrynkevich.easyaks.navigation

import androidx.compose.runtime.Composable
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import com.denishrynkevich.easyaks.screens.MainScreen
import com.denishrynkevich.easyaks.screens.SplashScreen
import com.denishrynkevich.easyaks.utils.Constants

sealed class Screens(val route: String) {
    object Splash: Screens(route = Constants.Screens.SPLASH_SCREEN)
    object Main: Screens(route = Constants.Screens.MAIN_SCREEN)
    object Quiz: Screens(route = Constants.Screens.QUIZ_SCREEN)
    object Results: Screens(route = Constants.Screens.RESULTS_SCREEN)

}
@Composable
fun SetupNavHost(navController: NavHostController) {
    NavHost(
        navController = navController,
        startDestination = Screens.Splash.route
    ) {
        composable(route = Screens.Splash.route) {
            SplashScreen(navController = navController)
        }
        composable(route = Screens.Main.route) {
            MainScreen()
        }
        composable(route = Screens.Quiz.route) {

        }
        composable(route = Screens.Results.route){

        }
    }
}