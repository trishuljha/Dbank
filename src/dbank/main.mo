import Debug "mo:base/Debug";
import Nat "mo:base/Nat";
import Time "mo:base/Time";
import Float "mo:base/Float";

actor DBank {
  stable var currentValue: Float = 300.0;
  stable var startTime = Time.now();

  public func topUp(amount: Float) {
    currentValue += amount;
    Debug.print(debug_show(currentValue));
  };

  public func withDraw(amt: Float) {
    if (amt > currentValue) {
      Debug.print("Insufficient Balance");
    } else {
      currentValue -= amt;
      Debug.print(debug_show(currentValue));
    }
  };

  public query func checkBalance(): async Float {
    return currentValue;
  };

  public func compound() {
    let currentTime = Time.now();
    let timeElapsed = currentTime - startTime;
    let time = Float.fromInt(timeElapsed / 1_000_000_000); // Convert nanoseconds to seconds
    currentValue *= (1.01 ** time);
    startTime := currentTime;
  };
}
