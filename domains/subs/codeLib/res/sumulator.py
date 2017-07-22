#!/usr/bin/python3

# note that module name has changed from Tkinter in Python 2 to tkinter in Python 3
from tkinter import *
from tkinter.ttk import *

"""
Using Grid Layout
most of this is taken from:: http://zetcode.com/gui/tkinter/layout/
and http://www.dabeaz.com/special/Tkinter.pdf

http://infohost.nmt.edu/tcc/help/pubs/tkinter/web/listbox-scrolling.html
(the real hero)
"""

class MainFrame(Frame):
    
    def __init__(self, parent):
        Frame.__init__(self, parent)
        parent.title("Sumulator")
        self.pack()
        self.initUI()

        
    def initUI(self):

        Style().configure("Sum", padding=(0, 5, 0, 5), font='serif 10')

        self.yScroll = Scrollbar(self, orient=VERTICAL)
        self.yScroll.grid(row=0, column=1, sticky=N+S)

        self.xScroll = Scrollbar(self, orient=HORIZONTAL)
        self.xScroll.grid(row=1, column=0, sticky=E+W)

        self.listbox = Listbox(self, selectmode=MULTIPLE,
                              xscrollcommand=self.xScroll.set,
                              yscrollcommand=self.yScroll.set)
        for i in range(1000):
            self.listbox.insert(END, str(i))
        self.listbox.bind("<<ListboxSelect>>", self.onClick)
        self.listbox.grid(row=0, column=0,  sticky=N+S+E+W)
        self.xScroll['command'] = self.listbox.xview
        self.yScroll['command'] = self.listbox.yview

        self.sumLabel = Label(self, text="0", width=10)
        self.sumLabel.grid(row=0, column=2, sticky=N+S+E+W)

    def onClick(self, event):
        # instead of self.listbox, can use event.widget here
        selection=self.listbox.curselection()
        self.sumLabel.config(text=sum(selection))
root = Tk()
app = MainFrame(root)
root.mainloop()
