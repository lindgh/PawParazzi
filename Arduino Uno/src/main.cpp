#include "timerISR.h"
#include "helper.h"

#define NUM_TASKS 3

typedef struct _task{
	signed 	 char state; 		//Task's current state
	unsigned long period; 		//Task period
	unsigned long elapsedTime; 	//Time elapsed since last task tick
	int (*TickFct)(int); 		//Task tick function
} task;

//const unsigned long periodTask = number;
const unsigned long GCD_PERIOD = 1;

task tasks[NUM_TASKS];

enum Sonar_States {SONAR_INIT};

int TickFct_Sonar(int state);

void TimerISR() {
    
	for (unsigned int i = 0; i < NUM_TASKS; i++) {             // Iterate through each task in the task array
		if ( tasks[i].elapsedTime == tasks[i].period ) {       // Check if the task is ready to tick
			tasks[i].state = tasks[i].TickFct(tasks[i].state); // Tick and set the next state for this task
			tasks[i].elapsedTime = 0;                          // Reset the elapsed time for the next tick
		}
		tasks[i].elapsedTime += GCD_PERIOD;                    // Increment the elapsed time by GCD_PERIOD
	}
}

int main(void) {
    
    //Initialize PORTD
    DDRD = 0xFF;
    PORTD = 0x00;
    //Initialize PORTC
    DDRC = 0b11111100;
    PORTC = 0b00000011;
    //Initialize PORTB
    DDRB = 0b11111110;
    PORTB = 0b00000001;

    sonar_init(); // initializes sonar

    // unsigned char i = 0;
    // tasks[i].state = SONAR_INIT;
    // tasks[i].period = periodSonar;
    // tasks[i].elapsedTime = tasks[i].period;
    // tasks[i].TickFct = &TickFct_Sonar;
    // ++i;

    TimerSet(GCD_PERIOD);
    TimerOn();

    while (1) {}

    return 0;
}

int TickFct_Sonar(int state) {
    switch (state) {
        // STATE TRANSITIONS
    }
    switch (state) {
        // STATE ACTIONS
    }
    return state;
}