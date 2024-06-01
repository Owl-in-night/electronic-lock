from flask import Flask, request, jsonify
from flask_cors import CORS
import RPi.GPIO as GPIO
import time

app = Flask(_name_)
CORS(app)  # Habilitar CORS para todas las rutas

# PINES
# rele
chapa = 21
# lucesA
led_pinA = 20
# lucesB
led_pinB = 16



# releService
def releService(channel, id):
    if id == "1":
        # GPIO setup
        GPIO.setmode(GPIO.BCM)
        GPIO.setup(channel, GPIO.OUT)
        # ON
        GPIO.output(channel, GPIO.HIGH)  # Turn motor on
        # TIME TO OPEN RELE
        time.sleep(3 / 4)
        # OFF
        GPIO.cleanup()
        if channel == GPIO.HIGH:
            return jsonify({'status': "true"})
        else:
            return jsonify({'status': "false"})
# lucesAService
def lucesService(channel, id):
    if id == "1":
        # GPIO setup
        GPIO.setmode(GPIO.BCM)
        GPIO.setup(channel, GPIO.OUT)
        GPIO.output(channel, GPIO.HIGH)  # Turn motor o
        return jsonify({'status': "true"})
    else:
        return jsonify({'status': "false"})

@app.route('/lab/<service>/<id>')
def labController(service, id):
    if service == "chapa":
        return releService(chapa, id)
    elif service == "luzA":
        return lucesService(led_pinA,id)
    elif service == "luzB":
        return lucesService(led_pinB,id)
    else:
        return jsonify({'service': "Whoops, service not found!"})

if _name_ == '_main_':
    app.run(host='0.0.0.0', port=5000)