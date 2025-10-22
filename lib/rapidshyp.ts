const RAPIDSHYP_API_KEY = process.env.RAPIDSHYP_API_KEY;
const RAPIDSHYP_BASE_URL = 'https://api.rapidshyp.com/v1';

interface ShipmentData {
  order_id: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  customer_address: string;
  customer_city: string;
  customer_state: string;
  customer_pincode: string;
  customer_country: string;
  product_name: string;
  product_quantity: number;
  product_weight: number;
  product_value: number;
  payment_mode: 'prepaid' | 'cod';
  cod_amount?: number;
  return_address: {
    name: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  courier_preference?: string;
  pickup_date?: string;
  special_instructions?: string;
}

interface TrackingResponse {
  success: boolean;
  data: {
    tracking_id: string;
    status: string;
    current_location: string;
    estimated_delivery: string;
    timeline: Array<{
      status: string;
      location: string;
      timestamp: string;
      description: string;
    }>;
  };
}

interface ShipmentResponse {
  success: boolean;
  data: {
    shipment_id: string;
    tracking_id: string;
    awb_number: string;
    courier_name: string;
    estimated_delivery: string;
    shipping_cost: number;
  };
}

export class RapidShypService {
  private async makeRequest(endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', data?: any) {
    const response = await fetch(`${RAPIDSHYP_BASE_URL}${endpoint}`, {
      method,
      headers: {
        'Authorization': `Bearer ${RAPIDSHYP_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`RapidShyp API error: ${response.status} ${response.statusText} - ${errorData.message || 'Unknown error'}`);
    }

    return response.json();
  }

  // Create a new shipment
  async createShipment(shipmentData: ShipmentData): Promise<ShipmentResponse> {
    try {
      const response = await this.makeRequest('/shipments', 'POST', shipmentData);
      return response;
    } catch (error) {
      console.error('Error creating shipment:', error);
      throw error;
    }
  }

  // Track shipment by tracking ID
  async trackShipment(trackingId: string): Promise<TrackingResponse> {
    try {
      const response = await this.makeRequest(`/tracking/${trackingId}`, 'GET');
      return response;
    } catch (error) {
      console.error('Error tracking shipment:', error);
      throw error;
    }
  }

  // Get shipment details by shipment ID
  async getShipmentDetails(shipmentId: string) {
    try {
      const response = await this.makeRequest(`/shipments/${shipmentId}`, 'GET');
      return response;
    } catch (error) {
      console.error('Error getting shipment details:', error);
      throw error;
    }
  }

  // Get shipment status
  async getShipmentStatus(shipmentId: string) {
    try {
      const response = await this.makeRequest(`/shipments/${shipmentId}/status`, 'GET');
      return response;
    } catch (error) {
      console.error('Error getting shipment status:', error);
      throw error;
    }
  }

  // Cancel shipment
  async cancelShipment(shipmentId: string, reason: string) {
    try {
      const response = await this.makeRequest(`/shipments/${shipmentId}/cancel`, 'POST', {
        reason,
        cancellation_reason: reason
      });
      return response;
    } catch (error) {
      console.error('Error canceling shipment:', error);
      throw error;
    }
  }

  // Get available couriers for a pincode
  async getAvailableCouriers(pincode: string) {
    try {
      const response = await this.makeRequest(`/couriers/available?pincode=${pincode}`, 'GET');
      return response;
    } catch (error) {
      console.error('Error getting available couriers:', error);
      throw error;
    }
  }

  // Calculate shipping cost
  async calculateShippingCost(data: {
    from_pincode: string;
    to_pincode: string;
    weight: number;
    value: number;
    courier_preference?: string;
  }) {
    try {
      const response = await this.makeRequest('/shipping/calculate', 'POST', data);
      return response;
    } catch (error) {
      console.error('Error calculating shipping cost:', error);
      throw error;
    }
  }

  // Get all shipments (with pagination)
  async getShipments(page: number = 1, limit: number = 10, status?: string) {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(status && { status })
      });
      const response = await this.makeRequest(`/shipments?${params}`, 'GET');
      return response;
    } catch (error) {
      console.error('Error getting shipments:', error);
      throw error;
    }
  }

  // Update shipment details
  async updateShipment(shipmentId: string, updateData: Partial<ShipmentData>) {
    try {
      const response = await this.makeRequest(`/shipments/${shipmentId}`, 'PUT', updateData);
      return response;
    } catch (error) {
      console.error('Error updating shipment:', error);
      throw error;
    }
  }

  // Get courier rates
  async getCourierRates(data: {
    from_pincode: string;
    to_pincode: string;
    weight: number;
    value: number;
  }) {
    try {
      const response = await this.makeRequest('/couriers/rates', 'POST', data);
      return response;
    } catch (error) {
      console.error('Error getting courier rates:', error);
      throw error;
    }
  }

  // Schedule pickup
  async schedulePickup(shipmentId: string, pickupData: {
    pickup_date: string;
    pickup_time_slot: string;
    special_instructions?: string;
  }) {
    try {
      const response = await this.makeRequest(`/shipments/${shipmentId}/pickup`, 'POST', pickupData);
      return response;
    } catch (error) {
      console.error('Error scheduling pickup:', error);
      throw error;
    }
  }

  // Get delivery proof
  async getDeliveryProof(shipmentId: string) {
    try {
      const response = await this.makeRequest(`/shipments/${shipmentId}/proof`, 'GET');
      return response;
    } catch (error) {
      console.error('Error getting delivery proof:', error);
      throw error;
    }
  }

  // Generate shipping label
  async generateLabel(shipmentId: string) {
    try {
      const response = await this.makeRequest(`/shipments/${shipmentId}/label`, 'GET');
      return response;
    } catch (error) {
      console.error('Error generating label:', error);
      throw error;
    }
  }
}

export const rapidShypService = new RapidShypService();

