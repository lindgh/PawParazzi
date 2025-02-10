#include "timerISR.h"
#include "helper.h"
#include "serialATmega.h"

#define NUM_TASKS 3

typedef struct _task{
	signed 	 char state; 		//Task's current state
	unsigned long period; 		//Task period
	unsigned long elapsedTime; 	//Time elapsed since last task tick
	int (*TickFct)(int); 		//Task tick function
} task;

const unsigned long SonarPeriod = 1;
const unsigned long TakePicPeriod = 500;
const unsigned long SendPicPeriod = 500;
const unsigned long GCD_PERIOD = 1;

task tasks[NUM_TASKS];

enum Sonar_States {SONAR_INIT};
enum TakePic_States {TAKE_PICTURE};
enum SendPic_States {SEND_PICTURE};

int TickFct_Sonar(int state);
int TickFct_TakePic(int state);
int TickFct_SendPic(int state);

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
    
    //Initialize PORTD as output
    DDRD = 0xFF;
    PORTD = 0x00;
    //Initialize PORTC (C2 - TRIG)
    DDRC = 0xFF;
    PORTC = 0x00;
    //Initialize PORTB (B0 - ECHO)
    DDRB = 0b11111110;
    PORTB = 0b00000001;

    //serial_init(9600);
    sonar_init();

    unsigned char i = 0;
    tasks[i].state = SONAR_INIT;
    tasks[i].period = SonarPeriod;
    tasks[i].elapsedTime = tasks[i].period;
    tasks[i].TickFct = &TickFct_Sonar;
    ++i;
    tasks[i].state = TAKE_PICTURE;
    tasks[i].period = TakePicPeriod;
    tasks[i].elapsedTime = tasks[i].period;
    tasks[i].TickFct = &TickFct_TakePic;
    ++i;
    tasks[i].state = SEND_PICTURE;
    tasks[i].period = SendPicPeriod;
    tasks[i].elapsedTime = tasks[i].period;
    tasks[i].TickFct = &TickFct_SendPic;
    ++i;

    TimerSet(GCD_PERIOD);
    TimerOn();

    while (1) {}

    return 0;
}

int TickFct_Sonar(int state) {
    switch (state) {
        // STATE TRANSITIONS
        case SONAR_INIT:
            //serial_println(sonar_read());
            if (sonar_read() < 20) {
                PORTD = PORTD | 0x20;
            }
            else {
                PORTD = PORTD & 0xDF;
            }
            break;

        default:
            state = SONAR_INIT;
            break;
    }
    switch (state) {
        // STATE ACTIONS
        case SONAR_INIT:
            break;

        default:
            break;
    }
    return state;
}

int TickFct_TakePic(int state) {
    switch (state) {
        // STATE TRANSITIONS
    }
    switch (state) {
        // STATE ACTIONS
    }
    return state;
}

int TickFct_SendPic(int state) {
    switch (state) {
        // STATE TRANSITIONS
    }
    switch (state) {
        // STATE ACTIONS
    }
    return state;
}