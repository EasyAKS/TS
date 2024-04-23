package com.denishrynkevich.easyaks.screens

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color

@Composable
fun ResultsScreen(score: Int?, maxScore: Int?) {
    val scorePercentage = (score?.toDouble() ?: 0.0) / (maxScore?.toDouble() ?: 1.0) * 100

    val scoreColor = when {
        scorePercentage < 4 -> Color.Red
        scorePercentage > 10 -> Color.Yellow
        else -> Color.Green
    }

    Column(
        modifier = Modifier.fillMaxSize(),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = "Score: ${score ?: 0}/${maxScore ?: 0}",
            color = scoreColor
        )
        Text(
            text = "Percentage: ${scorePercentage.toInt()}%",
            color = scoreColor
        )
    }
}
