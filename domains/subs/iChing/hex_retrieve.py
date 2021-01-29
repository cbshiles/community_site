# coding=utf-8
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

trigrams = ['kun', 'chen', 'kan', 'tui', 'ken', 'li', 'sun', 'chien']

import os 
dir_path = os.path.dirname(os.path.realpath(__file__))    

#The 'id' array contains the King Wen sequence
id=[]    
with open(dir_path+'/hex_map.t') as f:
  for ln in f.readlines():
          id += [int(z) for z in ln.rstrip().split('\t')[::-1]]


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

def binate(x):
  n = 32
  lzt = []
  while n > 0:
    q = x // n
    lzt.append(q)
    x -= n*q
    n //= 2
  return lzt

def orderOfDiff(h1, h2):
  b1 = binate(h1)
  b2 = binate(h2)
  c = 0
  for i in range(6):
    if b1[i] != b2[i]:
      c += 1
  return c

def numParts(h):
  b = binate(h)
  c = 1
  v = b[0]
  for i in range(5):
    if v != b[1+i]:
      v = b[1+i]
      c += 1
  return c
  
class Hex_Page:

  def __init__(self, text, num):
    self.num = binate(num)
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

  # i is which line to start on, n is how many to do
  def count(self, i, n):
          z = i
          m = 1
          a = 0
          while (z < i+n):
                  a += m*self.num[z]
                  m *= 2
                  z += 1
          return a

  def triTop(self):
          x = self.count(3, 3)
          return trigrams[x]

  def triBott(self):
          x = self.count(0, 3)
          return trigrams[x]

with open(dir_path+'/I-Ching_Wilhelm_Translation.html', 'r', encoding='utf-8') as hexF:
  m = re.split(r'<a name=".+"></a><br>', hexF.read()) #cuts off opening p tag    
  pages = [ Hex_Page(p, id[i]) for i, p in enumerate(m[1::]) ]

def trig(name):
        return '<img class="trigram" src="/iChing/'+name+'.gif">'

def styleHex(hp):
  bod = hp.body.split('</p>', 1)
  return '<div class="hexHead"><p class="hexTitle">'+bod[0]+'</p><div class="pix">'+trig(hp.triTop())+trig(hp.triBott())+'</div></div>'+bod[1]

def getPage(hx):
  hp = pages[hx.id]
  ans = styleHex(hp)
  cl = hx.changeList()
  if len(cl) > 0:
    ans += '<p>LINE CHANGES:</p>\n'+'\n'.join(hp.changes(cl))
    ans += '<p>CONVERTED HEXAGRAM:</p>\n'
    ans += styleHex(pages[hx.change().id])
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



#with open('hexPages/out.html', 'w') as out:
#  out.write(getPage(Hex(Ancient_Yarrow())))

#! Put this back on!
print(getPage(Hex(Ancient_Yarrow())).encode('ascii', errors='xmlcharrefreplace').decode())

#have a method that takes a hex and returns a tuple contained the numerical values for top and bottom trigram
#add pictures into html page, as well as the hexagram the original changes into  

# print(numParts(0))
# print(numParts(63))

# for i in range(64):
#  print(str(numParts(id[i]))+' '+str(id[i]))
  # print(orderOfDiff(id[i], id[i+1]), end=' ')
  #print(binate(id[2*i]))
  #print(str(id[2*i])+' - '+str(id[2*i+1]))

#def getID(hex):
#orderOfDiff(h1, h2):
