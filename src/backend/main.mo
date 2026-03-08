import Map "mo:core/Map";
import Order "mo:core/Order";
import Array "mo:core/Array";

actor {
  type PropertyType = {
    #luxuryResidential;
    #fixAndFlip;
    #shortTermRental;
    #other;
  };

  module PropertyType {
    public func compare(type1 : PropertyType, type2 : PropertyType) : Order.Order {
      switch (type1, type2) {
        case (#luxuryResidential, #luxuryResidential) { #equal };
        case (#luxuryResidential, _) { #less };
        case (#fixAndFlip, #fixAndFlip) { #equal };
        case (#fixAndFlip, #luxuryResidential) { #greater };
        case (#fixAndFlip, _) { #less };
        case (#shortTermRental, #shortTermRental) { #equal };
        case (#shortTermRental, #other) { #less };
        case (#shortTermRental, _) { #greater };
        case (#other, #other) { #equal };
        case (#other, _) { #greater };
      };
    };
  };

  type Inquiry = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    address : Text;
    propertyType : PropertyType;
    message : Text;
  };

  module Inquiry {
    public func compare(a : Inquiry, b : Inquiry) : Order.Order {
      Nat.compare(a.id, b.id);
    };
  };

  var nextId = 1;
  let inquiries = Map.empty<Nat, Inquiry>();

  public shared ({ caller }) func submitInquiry(
    name : Text,
    email : Text,
    phone : Text,
    address : Text,
    propertyType : PropertyType,
    message : Text,
  ) : async Nat {
    let inquiry : Inquiry = {
      id = nextId;
      name;
      email;
      phone;
      address;
      propertyType;
      message;
    };
    inquiries.add(nextId, inquiry);
    let id = nextId;
    nextId += 1;
    id;
  };

  public query ({ caller }) func getAllInquiries() : async [Inquiry] {
    let inquiryArray = inquiries.values().toArray();
    inquiryArray.sort();
  };

  public query ({ caller }) func getSubmissionCount() : async Nat {
    nextId - 1;
  };
};
