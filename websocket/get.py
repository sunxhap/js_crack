import time
from ws4py.client.threadedclient import WebSocketClient
  
  
class CG_Client(WebSocketClient):
      
    def opened(self):
        print("连接成功")
        self.max_cursor = 0
        self.send("Python")
  
    def closed(self, code, reason=None):
        print("Closed down:", code, reason)
  
    def received_message(self, resp):
         
        sign = resp.data.decode("utf-8")
        print("value:", sign)
          
        ws.close()
              
try:
    ws = CG_Client('ws://127.0.0.1:10512/')
     
    ws.connect()
 
    time.sleep(0.1)
     
    real_arg = "hello"
  
    ws.send(real_arg)
  
    ws.run_forever()
  
except KeyboardInterrupt:
    ws.close()
