�}�� r �  y��^y�i��a	���+^���}�o�:68v�TI �uO����ڦ�rmTuy�z�þ*}���LH�D\��ע��ve_�$4�JQ��,>%?_��)~��׾� :�h�ޝ�{a=��^s����;���
1[����۾��dj����|���Z����w�O��Eѥ�]>�P,�f=w,��x��E��-n�=
����aO�J�WG�e��l{ٻI��8K����`�9����(�ʠ�ƵU�^��0��6���A�>���#H������ ѣ/��<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�rgs e)
        {
            rptEAddressList.DataSource = MemcachedHelper.GetCacheObject("NewEAddressList", delegate() { return new EAddressBLL(EdushiSetting.ECS_DBConnectString).GetNewEAddressList(10); },new TimeSpan(0,10,0)) as DataTable;
            rptEAddressList.DataBind();
        }
    }
}
