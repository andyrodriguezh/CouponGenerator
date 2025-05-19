/**
 * Coupon model representing the structure of a coupon in the application
 */
class Coupon {
  constructor({
    id = null,
    title = '',
    businessName = '',
    logoUrl = '',
    description = '',
    discountType = 'percentage', // percentage, fixed, buyOneGetOne, freeItem
    discountValue = '',
    primaryColor = '#3182CE',
    secondaryColor = '#EDF2F7',
    textColor = '#1A202C',
    validFrom = new Date(),
    validUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    termsAndConditions = '',
    redirectUrl = '',
    redirectType = 'web', // web, whatsapp
    createdAt = new Date(),
    updatedAt = new Date(),
    scanCount = 0
  }) {
    this.id = id;
    this.title = title;
    this.businessName = businessName;
    this.logoUrl = logoUrl;
    this.description = description;
    this.discountType = discountType;
    this.discountValue = discountValue;
    this.primaryColor = primaryColor;
    this.secondaryColor = secondaryColor;
    this.textColor = textColor;
    this.validFrom = validFrom;
    this.validUntil = validUntil;
    this.termsAndConditions = termsAndConditions;
    this.redirectUrl = redirectUrl;
    this.redirectType = redirectType;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.scanCount = scanCount;
  }
  
  isValid() {
    const now = new Date();
    return now >= this.validFrom && now <= this.validUntil;
  }
  
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      businessName: this.businessName,
      logoUrl: this.logoUrl,
      description: this.description,
      discountType: this.discountType,
      discountValue: this.discountValue,
      primaryColor: this.primaryColor,
      secondaryColor: this.secondaryColor,
      textColor: this.textColor,
      validFrom: this.validFrom.toISOString(),
      validUntil: this.validUntil.toISOString(),
      termsAndConditions: this.termsAndConditions,
      redirectUrl: this.redirectUrl,
      redirectType: this.redirectType,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
      scanCount: this.scanCount
    };
  }
  
  static fromJSON(json) {
    return new Coupon({
      ...json,
      validFrom: new Date(json.validFrom),
      validUntil: new Date(json.validUntil),
      createdAt: new Date(json.createdAt),
      updatedAt: new Date(json.updatedAt)
    });
  }
}

export default Coupon;