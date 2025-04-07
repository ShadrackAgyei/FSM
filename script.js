document.addEventListener('DOMContentLoaded', function() {
    const blackBall = document.getElementById('black-ball');
    const whiteBall = document.getElementById('white-ball');
    const sequenceDiv = document.getElementById('sequence');
    const stateDisplay = document.getElementById('state-display');
    const resetBtn = document.getElementById('reset-btn');
    const toggleOverlapBtn = document.getElementById('toggle-overlap');
    
    let sequence = [];
    let currentState = 'Start';
    let overlap = false;
    
    // FSM transition function
    function transitionState(newBall) {
        const prevState = currentState;
        
        switch(currentState) {
            case 'Start':
                currentState = (newBall === 'B') ? 'State 1' : 'Start';
                break;
            case 'State 1':
                currentState = (newBall === 'W') ? 'State 2' : 'State 1';
                break;
            case 'State 2':
                if (newBall === 'B') {
                    currentState = overlap ? 'State 3' : 'Accept';
                } else {
                    currentState = 'Start';
                }
                break;
            case 'State 3':
                currentState = (newBall === 'W') ? 'State 2' : 'State 1';
                break;
            case 'Accept':
                currentState = (newBall === 'B') ? 'State 1' : 'Start';
                break;
        }
        
        return prevState !== currentState;
    }
    
    // Add ball to sequence
    function addBall(color) {
        const ball = document.createElement('div');
        ball.className = 'sequence-ball';
        ball.textContent = color === 'black' ? 'B' : 'W';
        ball.style.backgroundColor = color;
        ball.style.color = color === 'black' ? 'white' : 'black';
        if (color === 'white') {
            ball.style.border = '1px solid black';
        }
        sequenceDiv.appendChild(ball);
        
        sequence.push(color === 'black' ? 'B' : 'W');
        const stateChanged = transitionState(color === 'black' ? 'B' : 'W');
        updateStateDisplay(stateChanged);
    }
    
    // Update state display
    function updateStateDisplay(changed) {
        stateDisplay.textContent = `Current State: ${currentState}`;
        if (changed) {
            stateDisplay.style.backgroundColor = '#ffeb3b';
            setTimeout(() => {
                stateDisplay.style.backgroundColor = '';
            }, 500);
        }
        
        if (currentState === 'Accept') {
            stateDisplay.style.backgroundColor = '#4CAF50';
            stateDisplay.style.color = 'white';
        } else {
            stateDisplay.style.color = '';
        }
    }
    
    // Reset everything
    function resetSequence() {
        sequence = [];
        sequenceDiv.innerHTML = '';
        currentState = 'Start';
        updateStateDisplay(true);
    }
    
    // Toggle overlap
    function toggleOverlap() {
        overlap = !overlap;
        toggleOverlapBtn.textContent = `Toggle Overlap: ${overlap ? 'ON' : 'OFF'}`;
        resetSequence();
    }
    
    // Event listeners
    blackBall.addEventListener('click', () => addBall('black'));
    whiteBall.addEventListener('click', () => addBall('white'));
    resetBtn.addEventListener('click', resetSequence);
    toggleOverlapBtn.addEventListener('click', toggleOverlap);
});