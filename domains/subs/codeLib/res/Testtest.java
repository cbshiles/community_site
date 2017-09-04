package ServiceManagement.EnableDisable;

import java.time.LocalDate;
import java.util.*;
import org.junit.runners.*;
import org.junit.*;

import static org.junit.Assert.*;

public class TestTest 
{
    
    class TestCase {
    	public String memId, pass;
    	public List<AppTest> mes;
    
    	public TestCase(String memId, String pass){
    		this.memId = memId;
    		this.pass = pass;
    		mes = new ArrayList<AppTest>();
    	}
    	
    	public TestCase addEnrollment(LocalDate s, LocalDate d){
    		mes.add(new AppTest(memId, pass, s, d));
    		return this;
    	}
    
    	public List<AppTest> getList(){ //list of AppTests
    		return mes;
    	}
    }
    
    public List<List<AppTest>> getTestCases(){
    	
    //define Enrollment lists here 
    List<List<AppTest>> lzt = new ArrayList<List<AppTest>>();
    
    lzt.add(new TestCase("Bob Test", "T")
    		.addEnrollment(LocalDate.of(2016, 1, 1), LocalDate.of(2016, 10, 10))
    		.addEnrollment(LocalDate.of(2016, 10, 11), LocalDate.of(2016, 12, 12))
    		.addEnrollment(LocalDate.of(2016, 12, 11), LocalDate.of(2017, 12, 31))
    		.getList()
    		);

    lzt.add(new TestCase("Joe Test", "F")
    		.addEnrollment(LocalDate.of(2016, 1, 1), LocalDate.of(2016, 8, 8))
    		.addEnrollment(LocalDate.of(2016, 12, 11), LocalDate.of(2017, 12, 31))
    		.getList()
    		);
    lzt.add(new TestCase("Chad Test", "F")
    		.addEnrollment(LocalDate.of(2016, 1, 1), LocalDate.of(2017, 8, 8))
    		.addEnrollment(LocalDate.of(2017, 12, 11), LocalDate.of(2017, 12, 31))
    		.getList()
    		);
    
    lzt.add(new TestCase("Betty Test", "T")
    		.addEnrollment(LocalDate.of(2012, 1, 1), LocalDate.of(2016, 12, 8))
    		.addEnrollment(LocalDate.of(2017, 1, 1), LocalDate.of(2017, 12, 31))
    		.getList()
    		);
    
    lzt.add(new TestCase("Sue Test", "T")
    		.addEnrollment(LocalDate.of(2012, 1, 1), LocalDate.of(2016, 12, 30))
    		.getList()
    		);
    
    
    lzt.add(new TestCase("Gappo Test", "F")
    		.addEnrollment(LocalDate.of(2012, 1, 1), LocalDate.of(2016, 10, 8))
    		.addEnrollment(LocalDate.of(2016, 10, 10), LocalDate.of(2016, 11, 10))
    		.addEnrollment(LocalDate.of(2016, 11, 12), LocalDate.of(2017, 12, 31))
    		.getList()
    		);
    
    lzt.add(new TestCase("Paco Test", "T")
    		.addEnrollment(LocalDate.of(2012, 1, 1), LocalDate.of(2016, 10, 8))
    		.addEnrollment(LocalDate.of(2016, 10, 10), LocalDate.of(2017, 11, 10))
    		.addEnrollment(LocalDate.of(2017, 11, 12), LocalDate.of(2017, 12, 31))
    		.getList()
    		);    
    
    lzt.add(new TestCase("Overlap Gap Test", "T")
    		.addEnrollment(LocalDate.of(2012, 1, 1), LocalDate.of(2016, 12, 8))
    		.addEnrollment(LocalDate.of(2017, 2, 1), LocalDate.of(2017, 12, 31))
    		.getList()
    		);
    
    lzt.add(new TestCase("Overlap Gap2 Test", "F")
    		.addEnrollment(LocalDate.of(2012, 1, 1), LocalDate.of(2016, 12, 8))
    		.addEnrollment(LocalDate.of(2017, 2, 1), LocalDate.of(2017, 12, 29))
    		.getList()
    		);
    
    //are these treating the 45 day gap correctly?
    lzt.add(new TestCase("1 Chunk Test - A", "T")
    		.addEnrollment(LocalDate.of(2016, 2, 1), LocalDate.of(2017, 12, 8))
    		.getList()
    		);    
    lzt.add(new TestCase("1 Chunk Test - B", "T")
    		.addEnrollment(LocalDate.of(2016, 2, 1), LocalDate.of(2017, 11, 15))
    		.getList()
    		);
    lzt.add(new TestCase("1 Chunk Test - C", "F")
    		.addEnrollment(LocalDate.of(2016, 2, 1), LocalDate.of(2017, 11, 14))
    		.getList()
    		);
    lzt.add(new TestCase("1 Chunk Test - D", "T")
    		.addEnrollment(LocalDate.of(2013, 2, 1), LocalDate.of(2019, 11, 14))
    		.getList()
    		);

    lzt.add(new TestCase("Buncha Chunk Test - A", "T")
    		.addEnrollment(LocalDate.of(2016, 1, 1), LocalDate.of(2016, 2, 1))
    		.addEnrollment(LocalDate.of(2016, 2, 2), LocalDate.of(2016, 3, 1))
    		.addEnrollment(LocalDate.of(2016, 3, 2), LocalDate.of(2016, 4, 1))
    		.addEnrollment(LocalDate.of(2016, 4, 2), LocalDate.of(2016, 5, 1))
    		.addEnrollment(LocalDate.of(2016, 5, 2), LocalDate.of(2018, 1, 1))
    		.getList()
    		);

    lzt.add(new TestCase("Penelope Test", "F")
    		.addEnrollment(LocalDate.of(2016, 1, 3), LocalDate.of(2016, 12, 25))
    		.addEnrollment(LocalDate.of(2017, 1, 2), LocalDate.of(2017, 12, 25))
    		.getList()
    		);
    lzt.add(new TestCase("Jared Test", "F")
    		.addEnrollment(LocalDate.of(2016, 1, 3), LocalDate.of(2016, 12, 25))
    		.addEnrollment(LocalDate.of(2017, 1, 2), LocalDate.of(2017, 12, 25))
    		.getList()
    		);
    
    return lzt;
    }
    
    private boolean checkCase(List<AppTest> mes){
    	return true;
    }
    
    @Test
    public void testEnroll()
    {
    	System.out.println(getTestCases() == null);
    	for (List<AppTest> mes: getTestCases()){
    		//assertEquals(checkCase(mes)?"T":"F", mes.get(0).dental);
    		AppTest me = mes.get(0);
    		assertEquals("For member: "+me.memId, checkCase(mes)?"T":"F", me.pass);
    	}
    }
}
   