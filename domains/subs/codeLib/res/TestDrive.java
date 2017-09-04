package ServiceManagement.EnableDisable;

import org.junit.runner.*;
import org.junit.runner.notification.Failure;

public class TestDrive {

	public static void main(String[] args){
		Result result = JUnitCore.runClasses(AHTestSuite.class);
		for (Failure f: result.getFailures()){
			System.out.println("Fail: "+f);
		}
		System.out.println("Success: "+result.wasSuccessful());
	}
	
}
