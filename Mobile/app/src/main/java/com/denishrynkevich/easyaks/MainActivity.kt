package com.denishrynkevich.easyaks

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.navigation.compose.rememberNavController
import com.denishrynkevich.easyaks.navigation.SetupNavHost
import com.denishrynkevich.easyaks.ui.theme.EasyAKSTheme
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            EasyAKSTheme {
               val navController = rememberNavController()
                SetupNavHost(navController = navController)
            }
        }
    }
}