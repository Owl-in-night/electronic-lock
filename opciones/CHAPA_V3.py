from flask import Flask, request, jsonify
from flask_cors import CORS
import RPi.GPIO as GPIO
import time

app = Flask(__name__)
CORS(app)  # Habilitar CORS para todas las rutas

#PINES
    #rele
chapa = 21
    #lucesA
led_pinA = 18
button_pinA = 17
    #lucesB
led_pinB = 27
button_pinB = 22

#releSerivce
def releService(channel,id):
    if id == "1":
        # GPIO setup
        GPIO.setmode(GPIO.BCM)
        GPIO.setup(channel, GPIO.OUT)
        #ON
        GPIO.output(channel, GPIO.HIGH)  # Turn motor on
        #TIME TO OPEN RELE
        time.sleep(3/4)
        #OFF
        GPIO.cleanup()
        if channel == "HIGH":
            return jsonify({
            'status': "true"
            })
        else:
            return jsonify({
            'status': "false"
            })

#luces
def lucesAService(led_pinA,button_pinA,id):
    if id == "2":
        # GPIO setup
        GPIO.setmode(GPIO.BCM)
        GPIO.setup(led_pinA, GPIO.OUT)
        GPIO.setup(button_pinA, GPIO.IN)
        try:
    # Mantener el programa en ejecución
            while True:
            # Leer el estado del switch de palanca
                button_state = GPIO.input(button_pinA)
            # Si el switch está encendido, encender el LED
                if button_state:
                    GPIO.output(led_pinA, GPIO.HIGH)
                    return jsonify({
                    'status-led-A': "true"
                    })
            # Si el switch está apagado, apagar el LED
                else:
                    GPIO.output(led_pinA, GPIO.LOW)
                    time.sleep(0.1)
                    return jsonify({
                    'status-led-A': "false"
                    })

            # Esperar un breve periodo de tiempo antes de volver a verificar el estado del switch

        except KeyboardInterrupt:
        # Limpiar los pines GPIO y terminar el programa
            GPIO.cleanup()

def lucesBService(led_pinB,button_pinB,id):
    if id == "3":
        # GPIO setup
        GPIO.setmode(GPIO.BCM)
        GPIO.setup(led_pinB, GPIO.OUT)
        GPIO.setup(button_pinB, GPIO.IN)
        try:
    # Mantener el programa en ejecución
            while True:
            # Leer el estado del switch de palanca
                button_state = GPIO.input(button_pinB)

            # Si el switch está encendido, encender el LED
                if button_state:
                    GPIO.output(led_pinB, GPIO.HIGH)
                    return jsonify({
                    'status-led-B': "true"
                    })
            # Si el switch está apagado, apagar el LED
                else:
                    GPIO.output(led_pinB, GPIO.LOW)
                    time.sleep(0.1)
                    return jsonify({
                    'status-led-B': "false"
                    })
            # Esperar un breve periodo de tiempo antes de volver a verificar el estado del switch
        except KeyboardInterrupt:
        # Limpiar los pines GPIO y terminar el programa
            GPIO.cleanup()
            
@app.route('/lab/<service>/<id>')
def labController(service, id):
    if service == "chapa":
        return releService(chapa, id)
    elif service == "luzA":
        return lucesAService(led_pinA,button_pinA,id)
    elif service == "luzB":
        return lucesBService(led_pinB,button_pinB,id)
    else:
        return jsonify({
        'service': "Whoops, service not found!"
        })
        
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

