package com.denishrynkevich.easyaks

import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.denishrynkevich.easyaks.data.models.Theme
import com.denishrynkevich.easyaks.data.network.ApiRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class MainViewModel @Inject constructor(private val repository: ApiRepository) : ViewModel() {

    private val _themes = MutableLiveData<List<Theme>>()

    val themes: LiveData<List<Theme>>
        get() = _themes


    fun getAllQuestions() {
        viewModelScope.launch {
            val response = repository.getAllQuestions()
            if (response.isSuccessful) {
                val Data = response.body()
                _themes.postValue(Data?.themes.orEmpty())
            } else {
                _themes.postValue(emptyList()) // Update with empty list on error
                Log.d("CheckData", "Error: ${response.errorBody()}")
            }
        }
    }
}


