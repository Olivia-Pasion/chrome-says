const SUPABASE_URL = 'https://cpacsftmlinqqlebpokj.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwYWNzZnRtbGlucXFsZWJwb2tqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTY2MTU2NDUsImV4cCI6MTk3MjE5MTY0NX0.ETiUX0ewkH4XdEFOxdUkUdIqOJUi6Lb6QmgW1Cejy1Y';


export const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);