package com.denishrynkevich.easyaks.screens

import android.util.Log
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.livedata.observeAsState
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import com.denishrynkevich.easyaks.MainViewModel
import com.denishrynkevich.easyaks.navigation.Screens


@Composable
fun MainScreen(navController: NavController, viewModel: MainViewModel) {
    val themes = viewModel.themes.observeAsState(listOf()).value
    Log.d("CheckData", "THEME: ${viewModel.themes.value}")
    themes.forEach {
        Log.d("CheckData", "THEME: ${it.themeName}")
    }
    Column(
        modifier = Modifier.fillMaxSize(),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text("Choose a theme:")
        Spacer(modifier = Modifier.height(16.dp))
        themes.forEach { theme ->
            Button(onClick = {
                navController.navigate("quiz_screen/${theme.themeName}")
            }) {
                Text(theme.themeName.orEmpty())
            }
            Spacer(modifier = Modifier.height(16.dp))
        }
    }

    // Rest of your code displaying a button
    Button(
        onClick = { navController.navigate(Screens.Quiz.route) },
        modifier = Modifier
            .fillMaxWidth()
            .background(MaterialTheme.colorScheme.primary)
    ) {
        Text("GO TRAIN!", color = Color.White)
    }
}
