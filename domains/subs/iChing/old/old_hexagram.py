class Hexagram:

	def __init__(self, id):
		if id < 1 or id > 63:
			raise Exception("Invalid hexagram id.") 
		lines = []
		for x in range(0,6):
			lines.append(id%2)
			id //= 2
		self.lines = lines[::-1]
		
	def view(self):
		for x in range(0,6):
			if self.lines[x] == 1:
				print('---')
			else:
				print('- -')