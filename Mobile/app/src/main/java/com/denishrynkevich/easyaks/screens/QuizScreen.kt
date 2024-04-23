package com.denishrynkevich.easyaks.screens

import androidx.compose.animation.animateContentSize
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Checkbox
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import com.denishrynkevich.easyaks.MainViewModel
import com.denishrynkevich.easyaks.navigation.Screens

@Composable
fun QuizScreen(themeName: String?, viewModel: MainViewModel, navController: NavController) {
    // Здесь замените на реальные данные с сервера
    val question = "Какие языки используют для описания сетевого оборудования?"
    val answers = listOf("Java", "Kotlin", "C++", "Python")

    var selectedAnswerIndex by remember { mutableStateOf<Int?>(null) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        Text("Вопрос:")
        Text(question)
        Spacer(modifier = Modifier.height(16.dp))

        // Отображение вариантов ответов
        answers.forEachIndexed { index, answer ->
            var isChecked = index == selectedAnswerIndex

            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(8.dp)
                    .clickable {
                        selectedAnswerIndex = if (isChecked) null else index
                    },
                elevation = CardDefaults.cardElevation(
                    defaultElevation = if (isChecked) 8.dp else 2.dp
                )
            ) {
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    modifier = Modifier.padding(8.dp)
                ) {
                    Checkbox(
                        checked = isChecked,
                        onCheckedChange = { isChecked = it }
                    )
                    Text(
                        text = answer,
                        modifier = Modifier
                            .padding(start = 8.dp)
                            .animateContentSize()
                    )
                }
            }
        }

        Spacer(modifier = Modifier.height(16.dp))
        Text("Выбранный ответ: ${selectedAnswerIndex?.let { answers[it] } ?: "не выбран"}")

        Button(
            onClick = {
                navController.navigate(Screens.Results.route)
            },
            modifier = Modifier
                .fillMaxWidth()
                .background(MaterialTheme.colorScheme.primary)
                .padding(16.dp)
        ) {
            Text("Подтвердить выбор", color = Color.White)
        }
    }
}
