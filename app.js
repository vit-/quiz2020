const transitionTime = 100;

$(document).ready(function () {
    $('#loading').hide(transitionTime, function () {
        $('#welcome').show(transitionTime);
    });
});

$('.start').click(function () {
    $('#welcome').hide(transitionTime, function () {
        $('#game').show(transitionTime);
        tickGame();
    });
});

$('#next .btn-primary').click(tickGame);

$(document).on('click', '#game .btn.correct', function () {
    console.log('Correct!');
    $('#result .alert-danger').hide(transitionTime);
    $('#result .alert-success').show(transitionTime);
    $('#task').hide(transitionTime);
    $('#next').show(transitionTime);
});

$(document).on('click', '#game .btn.incorrect', function (event) {
    console.log('Incorrect!');
    $(event.target).addClass('btn-danger');
    $('#result .alert-danger').show(transitionTime);
    $('#result .alert-success').hide(transitionTime);
});

function endGame() {
    $('#game').hide(transitionTime, function () {
        $('.bg').hide();
        $('#finish').show(transitionTime);
    });
}

function tickGame() {
    let question = questions.shift();
    if (question === undefined) {
        // game finished
        endGame()
    } else {
        $('#result .alert').hide();
        $('#next').hide();
        $('#explanation').hide().text(question.explanation);
        $('#task').hide().empty().append($('<div class="row mx-auto"></div>').append($('<h1></h1>').text(question.text)));
        question.answers.forEach(function(answer, index) {
            $('#task').append(renderAnswer(answer));
        });
        $('#task').show(transitionTime);
    }
}

function renderAnswer(answer) {
    let btn = $('<button class="btn btn-secondary w-100 text-center"></button>').text(answer.text);
    if (answer.isCorrect) {
        btn.addClass('correct');
    } else {
        btn.addClass('incorrect');
    }
    return $('<div class="row mx-auto"></div>').append(btn);
}
