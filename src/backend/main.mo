import Map "mo:core/Map";
import Int "mo:core/Int";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";

actor {
  type ConversionEntry = {
    tiktokUrl : Text;
    timestamp : Time.Time;
    preset : Text;
    outputFilename : Text;
  };

  module ConversionEntry {
    public func compare(a : ConversionEntry, b : ConversionEntry) : Order.Order {
      Int.compare(b.timestamp, a.timestamp);
    };
  };

  let histories = Map.empty<Principal, [ConversionEntry]>();

  public shared ({ caller }) func addConversion(tiktokUrl : Text, preset : Text, outputFilename : Text) : async () {
    if (tiktokUrl.size() == 0 or outputFilename.size() == 0) {
      Runtime.trap("TikTok URL and output filename cannot be empty");
    };

    let newEntry : ConversionEntry = {
      tiktokUrl;
      timestamp = Time.now();
      preset;
      outputFilename;
    };

    let currentHistory = switch (histories.get(caller)) {
      case (?entries) { entries };
      case (null) { [] };
    };

    let updatedHistory = [newEntry].concat(currentHistory);
    histories.add(caller, updatedHistory);
  };

  public query ({ caller }) func getConversionHistory() : async [ConversionEntry] {
    switch (histories.get(caller)) {
      case (?entries) {
        entries.sort();
      };
      case (null) {
        [];
      };
    };
  };
};
