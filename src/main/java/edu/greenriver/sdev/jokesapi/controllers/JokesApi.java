package edu.greenriver.sdev.jokesapi.controllers;

import edu.greenriver.sdev.jokesapi.model.Joke;
import edu.greenriver.sdev.jokesapi.services.JokeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class JokesApi {

    private JokeService service;

    public JokesApi(JokeService service){
        this.service = service;
    }

    @GetMapping("jokes")
        public ResponseEntity<List<Joke>> allJokes(){
            return new ResponseEntity<>(service.getAllJokes(), HttpStatus.OK);
        }

    @GetMapping("jokes/random")
        public Joke randomJoke(){
            return service.random();
        }

    @GetMapping("jokes/{jokeId}")
    public Joke getJokeById(@PathVariable int jokeId){
        return service.getJokeById(jokeId);
    }
    //pass in  a new Joke object through the request body
    @PostMapping("jokes")
    public ResponseEntity<Joke> addJoke(@RequestBody Joke joke){
        return new ResponseEntity<>(service.addJoke(joke), HttpStatus.CREATED);
    }

    @PostMapping("jokes/query")
    public ResponseEntity<Joke> addJoke(@RequestParam String author, @RequestParam String text){
        Joke newJoke = new Joke(author + ": " + text);
        return new ResponseEntity<>(service.addJoke(newJoke), HttpStatus.CREATED);
    }

    @PutMapping("jokes")
    public ResponseEntity<Joke> editJoke(@RequestBody Joke joke){
        if(!service.jokeExistsById(joke.getId())){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(service.updateJoke(joke), HttpStatus.OK);
    }

    @DeleteMapping("jokes")
    public ResponseEntity deleteJoke(@RequestBody Joke joke){
        if(!service.jokeExistsById(joke.getId())){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        service.deleteJoke(joke.getId());
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}//end of class
