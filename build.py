parts=['data.js','monbase.js','jmon2.js','jmon3.js','jmon4.js','jmon5.js','jdata.js','jjob2.js','jsim.js','sprites.js','sprites6.js','sprites7.js','jspr3.js','jspr4.js','jrender.js','jui.js']
js="'use strict';\n"+"\n".join(open('src/'+p).read().replace("'use strict';","") for p in parts)
shell=open('src/shell.html').read()
open('index.html','w').write(shell.replace('/*SCRIPT*/',js))
print(len(js))
