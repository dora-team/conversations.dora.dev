<script>
    import questions_raw from "../assets/questions.txt?raw";
    let questions = questions_raw
        .split("\n")
        .sort((a, b) => 0.5 - Math.random()); // shuffle question order
    // console.log(questions);

    let current_question = $state(0);
    let next_question = $derived((current_question + 1) % questions.length);

    let question_parity = $derived(current_question % 2 ? "odd" : "even");
    let question_parity_next = $derived(current_question % 2 ? "even" : "odd");

    function next() {
        // slide questions left
        let nextQuestionEl = document.querySelector(
            `question.${question_parity_next}`,
        );
        nextQuestionEl.innerHTML = questions[next_question];
        nextQuestionEl.style.zIndex = "100";
        nextQuestionEl.style.left = "0px";

        let currentQuestionEl = document.querySelector(
            `question.${question_parity}`,
        );
        currentQuestionEl.style.zIndex = "0";
        currentQuestionEl.style.left = "300px";
        current_question++;

        currentQuestionEl = questions[current_question];
    }
</script>

<question_window>
    <questions>
        <question class="even">{questions[0]}</question>
        <question class="odd"></question>
    </questions>
</question_window>

<button onclick={next}>next</button>

<style>
    :root {
        box-sizing: border-box;
    }
    question_window {
        width: 400px;
        height: 300px;
        border: 1px solid blue;
        /* overflow:hidden; */
        position: absolute;
    }

    questions {
        display: block;
    }

    question {
        width: 300px;
        height: 300px;
        position: absolute;
        left: 0px;
        transition: all 0.3s ease-out;
        border: 1px solid red;
    }

    question.odd {
        left: 300px;
        border: 1px solid green;
    }

    button {
        position: absolute;
        top: 500px;
    }
</style>
