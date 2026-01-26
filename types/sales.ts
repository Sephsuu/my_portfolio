export interface Sales {
  date: string;             

  sku: string;              
  brand: string;            
  segment: string;         
  category: string;          

  channel: string;
  region: string;            

  pack_type: string;

  price_unit: number;       
  promotion_flag: 0 | 1;     

  delivery_days: number;    
  stock_available: number;   
  delivered_qty: number;     
  units_sold: number;       
}
