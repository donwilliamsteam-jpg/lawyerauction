import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function saveSubmission(data: any) {
  const { data: submission, error } = await supabase
    .from('attorney_submissions')
    .insert([data])
    .select()
    .maybeSingle();

  if (error) {
    console.error('Error saving submission:', error);
    throw error;
  }

  return submission;
}

export async function updateSubmission(id: string, data: any) {
  const { error } = await supabase
    .from('attorney_submissions')
    .update(data)
    .eq('id', id);

  if (error) {
    console.error('Error updating submission:', error);
    throw error;
  }
}

export async function getAllSubmissions() {
  const { data, error } = await supabase
    .from('attorney_submissions')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching submissions:', error);
    throw error;
  }

  return data;
}
