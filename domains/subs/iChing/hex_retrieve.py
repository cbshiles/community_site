import re

class Line:
	#assumes input between 6 and 9 inclusive
	def __init__(self, n):
		self.yin = (n%2 == 0)
		self.changing = (n == 6 or n == 9)
		
		if n==6:
			self.char = 'X'
		elif n==7:
			self.char = '-'
		elif n==8:
			self.char = ' '
		elif n==9:
			self.char = 'O'
			
	def change(self):
		return Line(8 if self.yin != self.changing else 7)
		
	def toString(self):
		return '-'+self.char+'-'
		
def print_hex(hex):
	for x in range(0,6):
		print(hex[5-x].toString())

import os 
dir_path = os.path.dirname(os.path.realpath(__file__))		

id=[]		
with open(dir_path+'/hex_map.t') as f:
	for ln in f.readlines():
		id += [int(z) for z in ln.rstrip().split('	')[::-1]]

def getID(hex):
	m = 64
	n = 0
	for line in hex:
		m //= 2
		if not line.yin:
			n += m
	return id.index(n)+1
	
import random			
def Ancient_Yarrow():
	random.seed()	
	remain = 0
	
	def  divide(x):
		nonlocal remain
		
		right = random.randint(2, x-1)
		left = x - right
		right -= 1
		
		z = 1 + reduce(right) + reduce(left)
		if z == 4 or z == 5:
			return 3
		elif z == 8 or z==9:
			return 2
		else:
			raise Exception("Bad stick count! - "+str(z))
		
	def reduce(x):
		nonlocal remain
		while x > 4:
			remain += 4
			x -= 4
		return x
	
	lzt = []
	for x in range(0,6):
		lzt.append(Line(divide(50-1) + divide(remain) + divide(remain)))
		remain = 0
	return lzt


class Hex_Page:

	def __init__(self, text):
		s0 = re.split('<p>  THE LINES</p>', text)
		self.body = s0[0]
		
		lines = re.split('(^.+means:<.+>)', s0[1], flags=re.MULTILINE)[1::]
		self.lines = [t[0]+t[1] for t in zip(lines[::2], lines[1::2])]
	
	#provide a list of changed lines #s, get the corresponding paragraphs back
	def changes(self, ilzt):
		ans = [self.lines[i] for i in ilzt]
		if len(ilzt) == 6 and len(self.lines) == 7:
			ans.append(self.lines[6]) #test this
		return ans
		
with open(dir_path+'/old/hexPages/I-Ching_Wilhelm_Translation.html') as hexF:
	m = re.split(r'<a name=".+"></a><br>', hexF.read()) #cuts off opening p tag		
	pages = [ Hex_Page(i) for i in m[1::] ]


def getPage(hx):
	hp = pages[hx.id]
	ans = '<p>'+hp.body
	cl = hx.changeList()
	if len(cl) > 0:
		ans += '<p>LINE CHANGES:</p>\n'+'\n'.join(hp.changes(cl))
		ans += '<p>CONVERTED HEXAGRAM:</p>\n'+pages[hx.change().id].body
	return ans

class Hex:

	def __init__(self, lines):
		self.lines = lines
		
		m = 64
		n = 0
		for line in lines:
			m //= 2
			if not line.yin:
				n += m
		self.id =  id.index(n)
		
	def changeList(self):
		ans = []
		for i in range(6):
			if self.lines[i].changing:
				ans.append(i)
		return ans
		
	def change(self):
		return Hex([line.change() for line in self.lines])

trigrams = ['kun', 'chen', 'kan', 'tui', 'ken', 'li', 'sun', 'chien']

#with open('hexPages/out.html', 'w') as out:
#	out.write(getPage(Hex(Ancient_Yarrow())))

print(getPage(Hex(Ancient_Yarrow())))

#have a method that takes a hex and returns a tuple contained the numerical values for top and bottom trigram
#add pictures into html page, as well as the hexagram the original changes into	
	
