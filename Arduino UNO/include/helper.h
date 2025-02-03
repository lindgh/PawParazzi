#include <avr/io.h>
#include <avr/interrupt.h>
#include <util/delay.h>

#ifndef HELPER_H
#define HELPER_H

void sonar_init(){
	sei();					/* Enable global interrupt */
	TIMSK1 = (1 << TOIE1);	/* Enable Timer1 overflow interrupts */
	TCCR1A = 0;
}

#endif