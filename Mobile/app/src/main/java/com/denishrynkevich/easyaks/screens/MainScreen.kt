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
import androidx.compose.runtime.LaunchedEffect
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
    val themeNames = viewModel.themeNames.observeAsState(listOf()).value
    Column(
        modifier = Modifier.fillMaxSize(),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text("Choose a theme:")
        Spacer(modifier = Modifier.height(16.dp))
        themeNames.forEach { theme ->
            Button(onClick = {
                navController.navigate("quiz_screen/${theme}")
            }) {
                Text(theme)
            }
            Spacer(modifier = Modifier.height(16.dp))
        }
    }

    // Log theme names only once when the list changes
    LaunchedEffect(themeNames) {
        if (themeNames.isNotEmpty()) {
            themeNames.forEach { theme ->
                Log.d("CheckData", "THEME: $theme")  // Use string interpolation for cleaner logs
            }
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
