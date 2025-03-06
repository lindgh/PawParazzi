#include "timerISR.h"
#include "helper.h"
//#include "serialATmega.h"

#define NUM_TASKS 1

typedef struct _task{
	signed 	 char state; 		//Task's current state
	unsigned long period; 		//Task period
	unsigned long elapsedTime; 	//Time elapsed since last task tick
	int (*TickFct)(int); 		//Task tick function
} task;

const unsigned long SonarPeriod = 250;
const unsigned long GCD_PERIOD = 250;

task tasks[NUM_TASKS];

enum Sonar_States {SONAR_INIT, TAKE_PICTURE, COUNT, UPLOAD_PICTURE};

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

    TimerSet(GCD_PERIOD);
    TimerOn();

    while (1) {}

    return 0;
}

int TickFct_Sonar(int state) {
    static int count;

    switch (state) {
        // STATE TRANSITIONS
        case SONAR_INIT:
            if ((sonar_read() >= 15) && (sonar_read() <= 30)) {
                state = TAKE_PICTURE;
            }
            else {
                state = SONAR_INIT;
            }
            break;

        case TAKE_PICTURE:
            state = COUNT;
            break;

        case COUNT:
            if (count > 12) {
                //in front of sensor for at least 3 seconds
                state = UPLOAD_PICTURE;
            }
            else if (sonar_read() < 20) {
                state = COUNT;
            }
            else {
                state = SONAR_INIT;
            }
            break;

        case UPLOAD_PICTURE:
            state = SONAR_INIT;
            break;

        default:
            state = SONAR_INIT;
            break;
    }
    switch (state) {
        // STATE ACTIONS
        case SONAR_INIT:
            //serial_println("Initialized");
            PORTD = PORTD & 0x00;    //turn the picture bit off
                                     //turn the upload bit off
            count = 0;
            break;

        case TAKE_PICTURE:
            //serial_println("Picture taken");
            PORTD = PORTD | 0x04; //turn the picture bit on
            break;

        case COUNT:
            PORTD = PORTD & 0x00; //turn the picture bit off
            //serial_println(count);
            ++count;
            break;

        case UPLOAD_PICTURE:
            //serial_println("Upload picture");
            count = 0;
            PORTD = PORTD | 0x08; //turn the upload bit on
            break;

        default:
            break;
    }
    return state;
}