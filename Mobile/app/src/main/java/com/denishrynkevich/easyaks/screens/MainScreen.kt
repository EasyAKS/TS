package com.denishrynkevich.easyaks.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.navigation.NavController
import com.denishrynkevich.easyaks.navigation.Screens
import kotlinx.coroutines.delay

@Composable
fun MainScreen(navController : NavController) {
    Button(
        onClick = { navController.navigate(Screens.Quiz.route) },
        modifier = Modifier
            .fillMaxWidth()
            .background(MaterialTheme.colorScheme.primary)
    ) {
        Text("GO TRAIN!", color = Color.White)
    }

}